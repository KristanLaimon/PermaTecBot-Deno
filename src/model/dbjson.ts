import fs from "node:fs";

export default class DbJson {
  static readJsonFileAs<T>(path: string): T {
    return JSON.parse(fs.readFileSync(path).toString());
  }

  static readConfigJson(): ConfigJson {
    return this.readJsonFileAs<ConfigJson>("./resources/config.json");
  }
}
