import PermaTecBot from "./src/core/permatecbot.ts";
(await import("npm:dotenv")).config();

console.log("Argumentos leídos y aceptados");
const bot = new PermaTecBot(Deno.env.get("BOT_TOKEN") ?? "");
console.log("Instanciando bot y arrancando! PermatecBot Inicializado");
bot.start();
