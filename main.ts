(await import("npm:dotenv")).config();

console.log("Argumentos leídos y aceptados");
import PermaTecBot from "./src/core/permatecbot.ts";
const bot = new PermaTecBot(Deno.env.get("BOT_TOKEN") ?? "");
console.log("Instanciando bot y arrancando! PermatecBot Inicializado");
bot.start();
