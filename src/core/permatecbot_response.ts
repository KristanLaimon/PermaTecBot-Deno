//Dependencies
import { Context } from "https://deno.land/x/grammy@v1.25.2/mod.ts";

type BotEvent = (ctx: Context) => void;

export default class BotResponse {
  private responseFunct: BotEvent | null = null;

  setReponse(funct: BotEvent) {
    this.responseFunct = (ctx) => {
      funct(ctx);
      this.responseFunct = null;
    };
  }

  call(ctx: Context) {
    if (this.responseFunct) this.responseFunct(ctx);
  }
}
