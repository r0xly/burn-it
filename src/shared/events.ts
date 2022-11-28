import { Networking } from "@flamework/networking";
import { AnimationType } from "types/enum/animation-type";

interface ServerEvents {
    collectCoin(coin: BasePart): void,
    voteMap(name: string): void,
}

interface ClientEvents {
    burn(part: BasePart): void,
    toolAdded(toolInstance: Tool, toolName: string): void,
    playAnimation(type: AnimationType, data: any): void,
    playerVoted(player: Player, map: string, remove: boolean): void,
    mapOptions(options: Model[]): void,
}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
