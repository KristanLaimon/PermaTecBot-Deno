import { InputFile } from "https://deno.land/x/grammy/mod.ts";
import { CommandModule } from "../../types/command_module.d.ts";
import PermaTecBot from "../permatecbot.ts";
import path from "node:path";

export default class Test implements CommandModule {
  command: (bot: PermaTecBot) => void | undefined = (bot) => {
    bot.command("test", (ctx) => {
      ctx.replyWithPhoto(new InputFile(path.resolve(Deno.cwd(), "logo.jpg")));
    });
  };
}
