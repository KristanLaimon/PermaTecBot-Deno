import PermaTecBot from "../core/permatecbot.ts";

interface FullCommandModule {
  command: (bot: PermaTecBot) => void | undefined;
  events: (bot: PermaTecBot) => void | undefined;
  filter: (bot: PermaTecBot) => void | undefined;
}

interface CommandModule {
  command: (bot: PermaTecBot) => void | undefined;
}
