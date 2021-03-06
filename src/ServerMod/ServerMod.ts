import { EventEmitter } from "events";
import { ModConfig, Resource } from "../LoadingMod";
import env from "../Environment";
import { ModUID } from "../UID";
import { Room, Player } from "../Room";

// Données stockées dans une instance de ServerMod, récupérées depuis le fichier de configuration
interface ServerModData {
    UID: ModUID;
    name: string;
    description: string;
    version: string;
    resources: Resource[];
}

export interface ServerModPublicData {
    UID: string;
    name: string;
    description: string;
    version: string;
    resources: Resource[]
}

export default abstract class ServerMod extends EventEmitter implements ServerModData
{
    public UID: ModUID;
    public name: string;
    public description: string;
    public version: string;
    public resources: Resource[];
    public room: Room | null = null;

    constructor(config: ModConfig)
    {
        super();

        ({
            UID: this.UID,
            name: this.name,
            description: this.description,
            version: this.version,
            resources: this.resources,
        } = config);

        if (!config)
        {
            env.logger.warning("Config is undefined");
        }

        console.log(`Hello from ${this.constructor.name}`);
    }
    
    public abstract update(): void;

    public abstract sendToBroadcast(event: string, data: any): void;

    public abstract sendToPlayer(player: Player, event: string, data: any): void;

    public abstract get publicData(): ServerModPublicData;

    public abstract onReceiveData(player: Player, event: string, data: any): void;
}