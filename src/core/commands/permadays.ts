//View Layer
import PermaTecBot from "../permatecbot.ts";

//Controller Layer
import Time from "../../controller/time.ts";
import { CommandModule } from "../../types/command_module.d.ts";

export default class PermaDays implements CommandModule {
  command(bot: PermaTecBot) {
    bot.command("permadays", (ctx) => {
      const startingDay = Time.getStartingDate();
      const daysPassed = Time.getDaysFromStartingDate();

      const strBuilder = [];
      strBuilder.push(`☀️ Día actual: ${daysPassed}`);
      strBuilder.push(`📅 Inicio del Server: ${startingDay.format("LL")}`);
      const msg = strBuilder.join("\n");

      ctx.reply(msg);
    });
  }

  events() {}

  filter() {}
}
