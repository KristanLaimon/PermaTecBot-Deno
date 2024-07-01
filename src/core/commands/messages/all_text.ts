//View Layer only
import PermaTecBot, { BotMode } from "../../permatecbot.ts";

export default function TextListener(bot: PermaTecBot): void {
  bot.on("message:text", ctx => {
    switch (bot.mode) {
      case BotMode.ExpectingNextMsg:
        bot.response.call(ctx);
        bot.mode = BotMode.Idle;
        break;
    }
  });
}

export { TextListener as filter };
