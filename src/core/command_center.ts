// Dependencies
import * as path from "https://deno.land/std@0.94.0/path/mod.ts";

// Entities layer
import PermaTecBot from "./permatecbot.ts";
import { FullCommandModule } from "../types/command_module.d.ts";

// Controller layer
import DbCache from "../controller/db_cache.ts";

/** Array Containing all commands setup functions to add to "PermaTecBot" */
const commandsToAdd: ((bot: PermaTecBot) => void)[] = [];

/** Array containing all frontend inline buttons events for INLINE KEYBOARD API */
const eventsToAdd: ((bot: PermaTecBot) => void)[] = [];

/** Array containig all msg filters when user responses to this bot */
const filtersToAdd: ((bot: PermaTecBot) => void)[] = [];

/**
 * Sets all commands declared in 'Commands' folder to main "PermaTecBot"
 * @param bot PermaTec Bot to add all commands
 */
async function setupAllFuncionalityBot(bot: PermaTecBot) {
  // const dir = path.resolve("src", "core", "commands");
  // await loadCommandsAndEvents(dir);

  //Get commands folder (absolute)
  const absPath = path.resolve(DbCache.Config.CommandsPath);
  await loadCommands(absPath);

  commandsToAdd.forEach((setCommandOn) => setCommandOn(bot));
  eventsToAdd.forEach((setEventOn) => setEventOn(bot));
  filtersToAdd.forEach((setFilterOn) => setFilterOn(bot));
}

async function loadCommands(absCommandFolderPath: string) {
  for (const inner of Deno.readDirSync(absCommandFolderPath)) {
    if (inner.isFile && inner.name.endsWith(".ts")) {
      const absFilePath = path.join(absCommandFolderPath, inner.name);

      //Use absPath and add the files name with extension
      //Using file:/// to not use relative paths from this file (used by default)
      const mod = new (
        await import("file:///" + absFilePath)
      ).default() as FullCommandModule;

      //Import default class and then apply to bot (store them in arrays first)
      if (mod.command) commandsToAdd.push(mod.command);
      if (mod.events) eventsToAdd.push(mod.events);
      if (mod.filter) filtersToAdd.push(mod.filter);
      console.log(
        "Command: " + inner.name + " loaded from " +
          path.basename(absCommandFolderPath),
      );
    }

    if (inner.isDirectory) {
      await loadCommands(path.join(absCommandFolderPath, inner.name));
    }
  }
}

export { setupAllFuncionalityBot };
