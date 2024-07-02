// deno-lint-ignore-file no-explicit-any
import { DB, RowObject } from "https://deno.land/x/sqlite@v3.8/mod.ts";
import DbJson from "./dbjson.ts";

export default class DbSqlite {
  private static _db: DB;

  static get Db() {
    if (this._db === undefined) {
      this._db = new DB(DbJson.readConfigJson().DatabasePath);
    }

    return this._db;
  }

  static set Db(newDb: DB) {
    this._db = newDb;
  }

  //All this methods should return a {}[] array of objects with tables props and more
  static Query<T>(sqlQuery: string): T;
  static Query(sqlQuery: string): RowObject {
    return this.Db.queryEntries(sqlQuery)[0];
  }

  static QueryAll<T>(sqlQuery: string): T[];
  static QueryAll(sqlQuery: string): any[] {
    return this.Db.queryEntries(sqlQuery);
  }

  static QueryWithParams<T>(sqlquery: string, params: any[]): T;
  static QueryWithParams(sqlQuery: string, params: any[]): RowObject {
    return this.Db.queryEntries(sqlQuery, params)[0];
  }

  static QueryWithParamsAll<T>(sqlQuery: string, params: any[]): T[];
  static QueryWithParamsAll(sqlQuery: string, params: any[]) {
    return this.Db.queryEntries(sqlQuery, params);
  }

  static ExecWithParams(sqlQuery: string, params: any[]): number {
    this.Db.query(sqlQuery, params);
    return this.Db.changes;
  }
}
