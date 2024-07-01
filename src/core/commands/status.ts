//View Layer
import PermaTecBot from "../permatecbot.ts";

//Controller Layer
import Apis from "../../controller/apis.ts";
import { CommandModule } from "../../types/command_module.d.ts";

export default class Status implements CommandModule {
  command(bot: PermaTecBot) {
    bot.command("status", (ctx) => {
      Apis.GetServerStatus((inf) => {
        const strBuilder = [];
        strBuilder.push(`📌 Online: ${inf.online}`);

        if (inf.online) {
          strBuilder.push(`⏏️ Cantidad Max. Jugadores: ${inf.players.max}`);
          strBuilder.push(`📨 MOTD: ${inf.motd.html}`);
          strBuilder.push(`✨ Versión: ${inf.version}`);
        }

        strBuilder.push(`🛠️  Ip: tecnianosisc.fun | foxxymc.tech`);
        strBuilder.push(`💀 Puerto: 25565`);

        ctx.reply(strBuilder.join("\n"));
      }, "foxxymc.tech");
    });
  }

  events() {}

  filter() {}
}
