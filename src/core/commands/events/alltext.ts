import { FullCommandModule } from "../../../types/command_module.d.ts";
import PermaTecBot, { BotMode } from "../../permatecbot.ts";

export default class implements FullCommandModule {
  command() {}
  events(bot: PermaTecBot) {
    bot.on("message:text", (ctx) => {
      switch (bot.mode) {
        case BotMode.ExpectingNextMsg:
          bot.response.call(ctx);
          bot.mode = BotMode.Idle;
          break;
      }
    });
  }
  filter() {}
}
