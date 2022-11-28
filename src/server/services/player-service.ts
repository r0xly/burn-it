import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { LocalizationService, Players } from "@rbxts/services";
import PlayerEntity from "server/classes/player-entity";
import SnowballTool from "shared/tools/snowball";
import { DataService } from "./data-service";
import { ToolService } from "./tool-service";

@Service({})
export class PlayerService implements OnInit {
    private playerEntities = new Map<Player, PlayerEntity>();
    private toolService = Dependency<ToolService>();
    private dataService = Dependency<DataService>();

    onInit() {
        Players.PlayerAdded.Connect((p) => this.onPlayerJoin(p))
        Players.PlayerRemoving.Connect((p) => this.onPlayerRemoving(p))
    }

    public getEntity(player: Player) {
        return this.playerEntities.get(player);
    }

    public getEntities() {
        const entites: PlayerEntity[] = [];

        this.playerEntities.forEach(entity => {
            entites.push(entity);
        });

        return entites;
    }

    private onPlayerJoin(player: Player) {
        const entity = new PlayerEntity(player);
        const leaderstats = new Instance("Folder");
        leaderstats.Parent = player;
        leaderstats.Name = "leaderstats";
        const coins = new Instance("IntValue");
        coins.Name = "Coins";
        coins.Parent = leaderstats;
        this.dataService.coinsChanged.Connect((_player, value) => {
            if (player === _player)
                coins.Value = value;
        })

        this.playerEntities.set(player, entity);
    }

    private onPlayerRemoving(player: Player) {
        const entity = this.getEntity(player);
        if (!entity) return; 
        this.playerEntities.delete(player);
    }
}