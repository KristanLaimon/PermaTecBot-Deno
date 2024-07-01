// // @deno-types="npm:@types/node-cron"
// import npmcron from "npm:node-cron";

import moment from "npm:moment";
import DbCache from "./db_cache.ts";

export default class Time {
  // static DailyTask: any;

  /**
   * Run a task everyday at specific hour. This Time class will keep the task on 'DailyTask' property
   * @param dailyCallBack Receives a function to call every day
   * @param Hour Hour of the day to call dailyCallBack. Default = 7 Hours (AM)
   * Format: 24Hrs
   * @returns
   */
  // static setupDailyTask(dailyCallBack: () => void) {
  //   npmcron.schedule(`0 0 * * *`, () => {
  //     dailyCallBack();
  //   });
  // }

  static setupTestTask(dailyCallBack: () => void) {
    setInterval(() => {
      dailyCallBack();
    }, 1000);
  }

  /**
   * First day is day 1 not 0!!
   * @returns number days from starting day 1
   */
  static getDaysFromStartingDate(): number {
    const startingDay = moment(DbCache.Config.StartingDay);
    const today = moment();
    return today.diff(startingDay, "days") + 1;
  }

  static setupLocaleTimeConfig(): void {
    moment.locale("es");
  }

  static getStartingDate(): moment.Moment {
    return moment(DbCache.Config.StartingDay);
  }
}
