//Dependencies
import { Context, InlineKeyboard } from "npm:grammy";

//View Layer
import PermaTecBot from "../permatecbot.ts";

//Controller Layer
import Subscriptions from "../../controller/subscriptions.ts";
import DbCache from "../../controller/db_cache.ts";
import { UserClickedSuscribedButton } from "../../controller/waiting.ts";
import { CommandModule } from "../../types/command_module.d.ts";

const timeSpan = DbCache.Config.WatingReponseTimeSpan / 1000;

export default class Start implements CommandModule {
  command(bot: PermaTecBot) {
    bot.command("start", (ctx) => {
      init(ctx);
    });
  }

  events(bot: PermaTecBot) {
    bot.callbackQuery("subscription-server", Subscribe);
    bot.callbackQuery("desubscription-server", Unsubscribe);
  }

  filter() {}
}

function init(ctx: Context) {
  const foundStartMsg = DbCache.Config.BotMessages.find(
    (msg) => msg.Title === "start"
  );

  if (foundStartMsg) {
    const keyboard = new InlineKeyboard()
      .text("Subscribirme a noticias del server", "subscription-server")
      .row()
      .url("GitHub", "https://github.com/KristanLaimon");

    ctx.reply(foundStartMsg.Message, {
      reply_markup: keyboard,
    });
  }
}

function Subscribe(ctx: Context) {
  if (!ctx.chat) return;
  const chatId = ctx.chat.id;

  if (UserClickedSuscribedButton(chatId, ctx)) {
    ctx.reply(
      `⏳ Por favor, espera ${timeSpan} segundos antes de intentar suscribirte de nuevo. ⏳`
    );
    ctx.answerCallbackQuery();
    return;
  }

  if (!Subscriptions.exists(chatId)) {
    Subscriptions.insertNewSubscriber(chatId);
    ctx.reply(`🟩 Se ha suscrito correctamente! 🟩`);
  } else if (Subscriptions.isSubscribed(chatId)) {
    ctx.reply("🟨 Ya se ha suscrito  🟨", {
      reply_markup: new InlineKeyboard().text(
        "Desuscribirse?",
        "desubscription-server"
      ),
    });
  } else {
    Subscriptions.subscribe(chatId);
    ctx.reply(`🟩 Se ha suscrito correctamente! 🟩`);
  }
  ctx.answerCallbackQuery();
}

function Unsubscribe(ctx: Context) {
  if (ctx.chat) {
    if (UserClickedSuscribedButton(ctx.chat.id, ctx)) {
      ctx.reply(
        `⏳ Por favor, espera ${timeSpan} segundos antes de intentar desuscribirte de nuevo. ⏳`
      );
      ctx.answerCallbackQuery();
      return;
    }

    if (Subscriptions.isSubscribed(ctx.chat.id)) {
      Subscriptions.unsubscribe(ctx.chat.id);
      ctx.reply("🟥 Se ha desuscrito. 🦊😢 🟥");
    } else {
      ctx.reply("Nunca estuvo suscrito..");
    }
    ctx.answerCallbackQuery();
  }
}
