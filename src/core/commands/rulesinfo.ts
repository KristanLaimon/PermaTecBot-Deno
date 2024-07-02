import * as path from "https://deno.land/std/path/mod.ts";
import { Context, InputFile } from "https://deno.land/x/grammy/mod.ts";

import DbCache from "../../controller/db_cache.ts";
import PermaTecBot from "../permatecbot.ts";

//@deno-types="npm:@types/node"
import fs from "node:fs";
import { CommandModule } from "../../types/command_module.d.ts";

export default class Rules implements CommandModule {
  command(bot: PermaTecBot) {
    bot.command("rulesinfo", rules);
  }
  events!: (bot: PermaTecBot) => void | undefined;
  filter!: (bot: PermaTecBot) => void | undefined;
}

function rules(ctx: Context) {
  ctx
    .replyWithPhoto(
      new InputFile(path.join(DbCache.Config.ImagesPath, "logo.jpg")),
      {
        caption: "Reglamento e Información",
      }
    )
    .then(() => {
      const rulesText = fs.readFileSync(DbCache.Config.RulesPath);
      ctx.reply(rulesText.toString());
    })
    .catch((reason) => {
      let help = "";
    });
}
