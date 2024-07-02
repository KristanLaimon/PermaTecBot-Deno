/// <reference path="../types/dbtypes.d.ts" />

//Dependencies
import path from "node:path";

import { Bot, InputFile } from "https://deno.land/x/grammy/mod.ts";

//View Layer
import { setupAllFuncionalityBot } from "./command_center.ts";
import BotResponse from "./permatecbot_response.ts";

//Controller Layer
import Time from "../controller/time.ts";
import DbCache from "../controller/db_cache.ts";
import Subscriptions from "../controller/subscriptions.ts";
import Query from "../controller/query.ts";

export enum BotMode {
  Idle,
  ExpectingNextMsg,
}

export default class PermaTecBot extends Bot {
  mode: BotMode = BotMode.Idle;
  response: BotResponse = new BotResponse();

  constructor(tokenAPI: string) {
    super(tokenAPI);
    setupAllFuncionalityBot(this).then(() => {
      Time.setupLocaleTimeConfig();
      Time.setupDailyTask(this.dailyBotTask.bind(this));
    });
  }

  dailyBotTask() {
    const daysPassed = Time.getDaysFromStartingDate();
    if (this.isPublicationDay(daysPassed)) {
      this.sendPublicationFromDay(daysPassed);
    }
  }

  isPublicationDay(dayNumber: number) {
    const todayIsTheDay = DbCache.DbPubs.find((pub) => pub.Day === dayNumber);
    if (todayIsTheDay) return true;
    else return false;
  }

  sendPublicationFromDay(day: number) {
    const allSubs = Subscriptions.getAllSubs();
    const fullPub = Query.getFullPublicationToday(day);

    const inputImgs = fullPub.imgs.map((img: PubImage) => {
      return new InputFile(path.join(DbCache.Config.ImagesPath, img.Name));
    });

    const coverImgInput = inputImgs[0];
    const restOfThem = inputImgs.slice(1);

    let firstPublication;
    //Max telegram length for caption is 70
    for (const sub of allSubs) {
      if (fullPub.message.length < 70) {
        firstPublication = this.api.sendPhoto(sub.ChatID, coverImgInput, {
          caption: fullPub.message,
        });
      } else {
        firstPublication = this.api
          .sendPhoto(sub.ChatID, coverImgInput)
          .then(() => {
            this.api.sendMessage(sub.ChatID, fullPub.message ?? "");
          });
      }

      firstPublication.then(() => {
        restOfThem.forEach((inputImg) => {
          this.api.sendPhoto(sub.ChatID, inputImg);
        });
      });
    }
  }
}
