import { Components } from "@flamework/components";
import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import { Component } from "@rbxts/roact";
import { ReplicatedStorage } from "@rbxts/services";
import Signal from "@rbxts/signal";
import Game from "server/classes/game";
import MapVoter from "server/classes/map-voter";
import { Burning } from "server/components/burning";
import { Events } from "server/events";
import { GameMeta } from "shared/meta/game-meta";
import Timer from "shared/modules/classes/timer";
import { GameStatus } from "types/enum/game-status";
import { PlayerService } from "./player-service";

@Service({})
export class GameService implements OnStart {
    public gameEnded = new Signal();
    private playerService =  Dependency<PlayerService>();
    private status: GameStatus = GameStatus.WaitingForPlayers;
    private components = Dependency<Components>();
    private timer: Timer = new Timer();
    private game: Game | undefined;
    private mapVoter?: MapVoter;
    
    onStart() {
        task.spawn(() => {
            while (true) {
                if (ReplicatedStorage.GetAttribute("Timer")  !== this.timer.toString() && !this.timer.isCompleted()) {
                    ReplicatedStorage.SetAttribute("Timer", this.timer.toString());
                }
                task.wait(1);
            } 
        });

        ReplicatedStorage.Events.Burn.OnServerEvent.Connect((player: Player, part: unknown) => {
            if (player.Character !== undefined) {
                const flintAndSteel = player.Character.FindFirstChild("Flint and Steel")

                if (typeIs(part, "Instance") && part.IsA("BasePart") && flintAndSteel) {
                    this.components.addComponent<Burning>(part);
                    flintAndSteel.Destroy();
                }
            }
        })

        let gameInited = false;

        while (true) {
            if (this.status === GameStatus.Active && this.game) {
                if (!gameInited) {
                    gameInited = true;
                    this.timer.set(GameMeta.gameLength);
                    task.delay(GameMeta.freePeriodLength, () => { this.game?.start() })
                }
                
                if (this.timer.isCompleted() || this.game.getNumberOfParticipants() <= 1) {
                    this.gameEnded.Fire();
                    this.game.end();
                    this.setStatus(GameStatus.WaitingForPlayers);
                    gameInited = false;
                }
            } else if (this.status === GameStatus.Intermission) {
                if (this.timer.isCompleted()) {
                    this.mapVoter?.destroy();
                    this.mapVoter = new MapVoter();
                    this.setStatus(GameStatus.MapVoting);
                    this.timer.set(GameMeta.mapVotingLength);
                }
            } else if (this.status === GameStatus.MapVoting) {
                if (this.timer.isCompleted()) {
                    this.game = new Game(this.mapVoter?.getWinner() as Model);
                    this.setStatus(GameStatus.Active);
                }   
            } else {
                const entities = this.playerService.getEntities();
                
                if (entities.size() >= GameMeta.requiredPlayers) {
                    this.setStatus(GameStatus.Intermission);
                    this.timer.set(GameMeta.intermissionLength);
                } else {
                    this.setStatus(GameStatus.WaitingForPlayers);
                }
            }

            task.wait();
       } 
    }
    private setStatus(status: GameStatus) {
        this.status = status;
        ReplicatedStorage.SetAttribute("Status", status);
    }
}