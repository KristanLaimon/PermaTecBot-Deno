/// <reference path="../types/config.d.ts" />

//Model Layer
import DbJson from "../model/dbjson.ts";
import DbSqlite from "../model/dbsqlite.ts";

export default class DbCache {
  private static _dbImages: PubImage[];
  private static _dbPublications: Publication[];
  private static _jsonConfig: ConfigJson;

  static get DbImages(): PubImage[] {
    if (!this._dbImages) {
      this._dbImages = getImgFromDb();
    }

    return this._dbImages;
  }

  static get DbPubs(): Publication[] {
    if (!this._dbPublications) {
      this._dbPublications = getPubsFromDb();
    }

    return this._dbPublications;
  }

  static get Config(): ConfigJson {
    if (!this._jsonConfig) {
      this._jsonConfig = DbJson.readConfigJson();
    }
    return this._jsonConfig;
  }

  static refreshCache() {
    this._dbImages = getImgFromDb();
    this._dbPublications = getPubsFromDb();
    this._jsonConfig = DbJson.readConfigJson();
  }
}

//Private functions of this module
function getImgFromDb(): PubImage[] {
  return DbSqlite.QueryAll("SELECT * FROM Image;") as PubImage[];
}

function getPubsFromDb(): Publication[] {
  return DbSqlite.QueryAll("SELECT * FROM Publication") as Publication[];
}
