//View Layer
import PermaTecBot, { BotMode } from "../permatecbot.ts";

//Controller Layer
import Subscriptions from "../../controller/subscriptions.ts";
import { CommandModule } from "../../types/command_module.d.ts";

export default class Send implements CommandModule {
  command(bot: PermaTecBot) {
    bot.command("send", (ctx) => {
      ctx.reply("Escribe el número de día en el que desees consultar.");
      bot.mode = BotMode.ExpectingNextMsg;
      bot.response.setReponse((ctx) => {
        const message = ctx.message ?? { text: "" };
        const day = parseInt(message.text ?? "0");
        if (bot.isPublicationDay(day)) {
          if (Subscriptions.isSubscribed(ctx.from?.id ?? 0)) {
            bot.sendPublicationFromDay(day);
          } else {
            ctx.reply("Tienes que estar suscrito para mandarte esto");
          }
        } else {
          ctx.reply("En ese día no hay publicaciones");
        }
      });
    });
  }
  events() {}
  filter() {}
}
