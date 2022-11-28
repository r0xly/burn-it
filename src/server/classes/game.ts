import { Components } from "@flamework/components";
import { Dependency } from "@flamework/core";
import Maid from "@rbxts/maid";
import { Players, ReplicatedStorage, Workspace } from "@rbxts/services";
import { Burning } from "server/components/burning";
import { DataService } from "server/services/data-service";
import { PlayerService } from "server/services/player-service";
import { ToolService } from "server/services/tool-service";
import Snowball from "shared/tools/snowball";
import { Map } from "types/types/map";
import Coin from "./coin";
import Luckyblock from "./luckyblock";
import PlayerEntity from "./player-entity";

const PLAYER_SPAWN_OFFSET = new Vector3(0, 5, 0); 

export default class Game {
    private activeParticipants = new Map<Player, PlayerEntity>();
    private components = Dependency<Components>();
    private playerService = Dependency<PlayerService>();
    private toolService = Dependency<ToolService>();
    private dataService = Dependency<DataService>();
    private map;
    private maid = new Maid();
    public static active = false;

    constructor(map: Model) {
        this.map = this.loadMap(map);

        for (const entity of this.playerService.getEntities()) {
            const player = entity.player;
    
            if (entity.afk || !player.Character || !player.Character.FindFirstChild("HumanoidRootPart")) return;
            this.activeParticipants.set(entity.player, entity);
    
            const spawnpoints = this.map.Spawns.Players.GetChildren();
            const spawnpoint = spawnpoints[math.random(0, spawnpoints.size() - 1)] as BasePart;
            this.spawnPlayer(entity, spawnpoint);
    
            this.maid.GiveTask(entity.player.CharacterRemoving.Connect(() => {
                if (!this.activeParticipants.get(player)) return;
    
                this.activeParticipants.delete(player);
            }));
        }
    
        this.maid.playerLeaving = Players.PlayerRemoving.Connect(player => {
            if (!this.activeParticipants.get(player)) return;
            this.activeParticipants.delete(player);
        });
    }

    public start() {
        this.burnRandomPart();
        this.burnRandomPart();
        this.burnRandomPart();
        Workspace.Ground.CanCollide = false;
        Game.active = true;
    }
    
    private loadMap(theMap: Model) {
        const map = theMap.Clone() as Map;
        
        for (const part of map.Spawns.Coins.GetChildren()) {
            new Coin((part as BasePart).Position);
        }
        
        for (const part of map.Spawns.Luckyblocks.GetChildren()) {
            new Luckyblock((part as BasePart).CFrame);
        }
        
        map.Parent = Workspace.MapHolder.Map;
        Workspace.Ground.Transparency = 1;
        
        task.wait(4);
        
        return map;
    }
    
    private burnRandomPart() {
        const parts = this.map.Objects.GetDescendants();
        let part = parts[math.random(0, parts.size() - 1)]
        
        while (!part.IsA("BasePart")) {
            part = parts[math.random(0, parts.size() - 1)]
            task.wait();
        }
        
        this.components.addComponent<Burning>(part);
    }
    
    private spawnPlayer(entity: PlayerEntity, spawnpoint: BasePart) {
        this.toolService.giveTool(entity, Snowball);
        const character = entity.player.Character;
        if (character) {
            const rootPart = character.WaitForChild("HumanoidRootPart") as BasePart;
            const humanoid = character.WaitForChild("Humanoid") as Humanoid;
            
            rootPart.CFrame = spawnpoint.CFrame.add(PLAYER_SPAWN_OFFSET);
            humanoid.Health = humanoid.MaxHealth;
            const tag = new Instance("IntValue");
            tag.Name = "INGAME"
            tag.Parent = character;
        }
    }
    
    public getNumberOfParticipants() {
        return this.activeParticipants.size();
    }
    
    public end() {
        this.maid.Destroy();
        let elWinnerText = ""
        this.activeParticipants.forEach(enitiy => {
            this.dataService.giveCoins(enitiy.player, 20)
            enitiy.player.LoadCharacter();
            elWinnerText += enitiy.player.Name + "\n"; 
        });

        ReplicatedStorage.Events.Winners.FireAllClients(elWinnerText);

        Workspace.Ground.Transparency = 0;
        Workspace.MapHolder.Map.ClearAllChildren();
        Workspace.Ground.CanCollide = true;
        Workspace.MapHolder.Spawnables.ClearAllChildren();
        Game.active = false;
    }
}