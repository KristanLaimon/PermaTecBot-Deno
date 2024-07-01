// serverInfo.d.ts
interface ServerInfo {
    online: boolean;
    ip: string;
    port: number;
    hostname?: string;
    debug: DebugInfo;
    version: string;
    protocol?: ProtocolInfo;
    icon?: string;
    software?: string;
    map: MapInfo;
    gamemode?: string;
    serverid?: string;
    eula_blocked?: boolean;
    motd: MotdInfo;
    players: PlayersInfo;
    plugins?: PluginInfo[];
    mods?: ModInfo[];
    info?: InfoDetails;
}

interface DebugInfo {
    ping: boolean;
    query: boolean;
    srv: boolean;
    querymismatch: boolean;
    ipinsrv: boolean;
    cnameinsrv: boolean;
    animatedmotd: boolean;
    cachehit: boolean;
    cachetime: number;
    cacheexpire: number;
    apiversion: number;
    error: DebugError;
}

interface DebugError {
    ping: string;
    query: string;
    a: string;
    aaaa: string;
}

interface ProtocolInfo {
    version: number;
    name: string;
}

interface MapInfo {
    raw: string;
    clean: string;
    html: string;
}

interface MotdInfo {
    raw: string[];
    clean: string[];
    html: string[];
}

interface PlayersInfo {
    online: number;
    max: number;
    list?: PlayerInfo[];
}

interface PlayerInfo {
    name: string;
    uuid: string;
}

interface PluginInfo {
    name: string;
    version: string;
}

interface ModInfo {
    name: string;
    version: string;
}

interface InfoDetails {
    raw: string[];
    clean: string[];
    html: string[];
}
