import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { ReplicatedStorage, RunService, Workspace } from "@rbxts/services";
import { Map } from "types/types/map";
import { GameService } from "server/services/game-service";
import { Events } from "server/events";
import Timer from "shared/modules/classes/timer";
import Game from "server/classes/game";

const OBJECT_LIFETIME = 20; 
const DEBOUNCE_LENGTH = 5;
const TOUCH_DAMAGE = 2;
const HITBOX_SIZE_OFFSET = new Vector3(0.25, 0.25, 0.25);
let PARTS_GOING_TO_BURN: BasePart[] =  [];
@Component()
export class Burning extends BaseComponent<{}, BasePart> implements OnStart {
    private components = Dependency<Components>();
    private gameService = Dependency<GameService>();
    private debounce = new Timer(DEBOUNCE_LENGTH);
    private random = new Random();

    onStart() {
        Events.burn.broadcast(this.instance);
        this.instance.Anchored = false;

        task.delay(OBJECT_LIFETIME, () => {
            if (this.instance) {
                this.Destroy();
            }
        });

        this.maid.GiveTask(this.gameService.gameEnded.Connect(() => {
            this.Destroy();
        }));


        this.maid.GiveTask(RunService.Heartbeat.Connect(() => {
            if (this.hasTag() && this.debounce.isCompleted() && Workspace.MapHolder.Map.GetChildren()[0]) {
                const mapObjects = (Workspace.MapHolder.Map.GetChildren()[0] as Map).Objects;
                const burnableParts = this.getAdjacentParts();
                const damagedHumanoids = new Map<string, Humanoid>();
                
                for (const part of burnableParts) {
                    if (!part.IsA("BasePart")) return;
                    if (part.IsA("BasePart") && !PARTS_GOING_TO_BURN.includes(part) && part.IsDescendantOf(mapObjects) && !this.components.getComponent<Burning>(part)) {
                        part.Anchored = false;
                        PARTS_GOING_TO_BURN.push(part);
                        task.delay(this.random.NextNumber(10, 15), () => {
                            if (this.hasTag()) { 
                                this.components.addComponent<Burning>(part);
                            }
                        });
                    } else if (part.Parent && part.Parent.FindFirstChild("Humanoid") && !damagedHumanoids.get(part.Parent.Name)) {
                        const humanoid = part.Parent.FindFirstChild("Humanoid") as Humanoid;
                        humanoid.TakeDamage(TOUCH_DAMAGE);
                        damagedHumanoids.set(part.Parent.Name, humanoid);
                    }
                }
            }
        }));
    }

    private getAdjacentParts() {
        return Workspace.GetPartBoundsInBox(this.instance.CFrame, this.instance.Size.add(HITBOX_SIZE_OFFSET));
    }

    private hasTag() {
        return this.instance && Game.active && this.components.getComponent<Burning>(this.instance);
    }

    public Destroy() {
        this.destroy();
        this.maid.Destroy();
        this.components.removeComponent<GameService>(this.instance);
        this.instance.Destroy();
    }
}