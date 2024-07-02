//Model Layer
import DbSqlite from "../model/dbsqlite.ts";
import Subscription from "../types/subscription.d.ts";

export default class Subscriptions {
  /**
   * Insert a new chatId Subscriber by default with Subscribe === "True"
   * @param newIdChat
   * @returns A boolean value if this method succeeded
   */
  static insertNewSubscriber(newIdChat: number): boolean {
    const rowsAffected = DbSqlite.ExecWithParams(
      "INSERT INTO Subscription (ChatID, Subscribed) VALUES (?,?)",
      [newIdChat, 1]
    );

    return rowsAffected > 0;
  }

  static subscribe(idChat: number) {
    const rowsAffected = DbSqlite.ExecWithParams(
      `
      UPDATE Subscription
      SET Subscribed = TRUE
      WHERE ChatID = ?;
      `,
      [idChat]
    );

    return rowsAffected > 0;
  }

  static unsubscribe(idChat: number) {
    const rowsAffected = DbSqlite.ExecWithParams(
      `
      UPDATE Subscription
      SET Subscribed = FALSE
      WHERE ChatID = ?;
      `,
      [idChat]
    );

    return rowsAffected > 0;
  }

  //is a boolean return type really
  static isSubscribed(idChat: number): boolean {
    const foundSub = DbSqlite.QueryWithParams<{ Subscribed: number }>(
      "SELECT Subscribed FROM Subscription WHERE ChatID = ?;",
      [idChat]
    );

    return foundSub && foundSub.Subscribed === 1;
  }

  static exists(idChat: number): boolean {
    let exists;

    try {
      exists = DbSqlite.QueryWithParams<{ ChatID: number }>(
        "SELECT ChatID FROM Subscription WHERE ChatID = ?;",
        [idChat]
      );
    } catch {
      exists = undefined;
    }

    return typeof exists !== "undefined";
  }

  static getAllSubs(): Subscription[] {
    const allSubs = DbSqlite.QueryAll<Subscription>(
      "SELECT * FROM Subscription;"
    );
    return allSubs;
  }
}
