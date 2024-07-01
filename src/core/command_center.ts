// Dependencies
import path from "node:path";

// Entities layer
import PermaTecBot from "./permatecbot.ts";
import { CommandModule } from "../types/command_module.d.ts";

// Controller layer
import DbCache from "../controller/db_cache.ts";

/** Array Containing all commands setup functions to add to "PermaTecBot" */
const commandsToAdd: ((bot: PermaTecBot) => void)[] = [];

/** Array containing all frontend inline buttons events for INLINE KEYBOARD API */
const eventsToAdd: ((bot: PermaTecBot) => void)[] = [];

/** Array containig all msg filters when user responses to this bot */
const filtersToAdd: ((bot: PermaTecBot) => void)[] = [];

/** Reads all command files RECURSIVELY on command folder name from from config.json */ //Local Method
async function loadCommandsAndEvents(dir: string) {
  //First check linux filesytem then win-style
  const folderName = dir.split("\\").at(-1) || dir.split("/").at(-1);

  for await (const inner of Deno.readDir(dir)) {
    if (inner.isFile && inner.name.endsWith(".ts")) {
      try {
        const modPath = `./${folderName}/` + inner.name;

        const commandModule = new (
          await import(modPath)
        ).default() as CommandModule;

        if (commandModule.command) commandsToAdd.push(commandModule.command);

        if (commandModule.events) eventsToAdd.push(commandModule.events);

        if (commandModule.filter) filtersToAdd.push(commandModule.filter);
      } catch (err) {
        console.error(`Error loading module ${inner.name}:`, err);
      }
    }
  }
}

/**
 * Sets all commands declared in 'Commands' folder to main "PermaTecBot"
 * @param bot PermaTec Bot to add all commands
 */
async function setupAllFuncionalityBot(bot: PermaTecBot) {
  const dir = path.resolve(Deno.cwd(), DbCache.Config.CommandsPath);
  await loadCommandsAndEvents(dir);

  commandsToAdd.forEach((setCommandOn) => setCommandOn(bot));
  eventsToAdd.forEach((setEventOn) => setEventOn(bot));
  filtersToAdd.forEach((setFilterOn) => setFilterOn(bot));
}

export { setupAllFuncionalityBot };
