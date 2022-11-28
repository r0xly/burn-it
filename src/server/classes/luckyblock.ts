import { Dependency, Modding } from "@flamework/core";
import Maid from "@rbxts/maid";
import { Players, ReplicatedStorage, Workspace } from "@rbxts/services";
import { Events } from "server/events";
import { PlayerService } from "server/services/player-service";
import { ToolService } from "server/services/tool-service";
import { Tool } from "shared/modules/decorators/tool-decorator";
import { getRandomTool } from "shared/util/get-random-tool";
import { AnimationType } from "types/enum/animation-type";
import PlayerEntity from "./player-entity";

const SPAWN_OFFSET = new Vector3(0, 1.5, 0);

export default class Luckyblock {
    private part = ReplicatedStorage.GameAssets.Luckyblock.Clone();
    private maid = new Maid();
    private playerService = Dependency<PlayerService>();
    private toolSerivce = Dependency<ToolService>();

    constructor(cframe: CFrame) {
        this.part.CFrame = cframe.add(SPAWN_OFFSET);
        this.part.Parent = Workspace.MapHolder.Spawnables;
        this.maid.part = this.part;
        this.maid.GiveTask(this.part.Touched.Connect(hit => this.onTouched(hit)));
    }

    private onTouched(hit: BasePart) {
        if ((hit.Parent && hit.Parent.FindFirstChild("Humanoid") && Players.GetPlayerFromCharacter(hit.Parent)) || (hit.Parent && hit.Parent.Parent && hit.Parent.Parent.FindFirstChild("Humanoid") && Players.GetPlayerFromCharacter(hit.Parent.Parent))) {
            const player = (Players.GetPlayerFromCharacter(hit.Parent) || Players.GetPlayerFromCharacter(hit.Parent.Parent)) as Player;
            const entity = this.playerService.getEntity(player) as PlayerEntity;
            const [toolObject, rarity] = getRandomTool(); 

            const decorator = Modding.getDecorator<typeof Tool>(toolObject);
    
            if (decorator) { 
                this.toolSerivce.giveTool(entity, toolObject); 
                const [{ name, tool }] = decorator.arguments;
                Events.playAnimation(player, AnimationType.Luckyblock, {
                    Icon: tool.TextureId,
                    Name: name,
                    Rarity: rarity,
                });

                this.maid.Destroy();
            } else {
                error("Luckyblock failed to give random tool because there was no decorator")
            }
        }
    }
}