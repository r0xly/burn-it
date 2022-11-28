import { Controller, OnInit, OnStart } from "@flamework/core";
import { Players, RunService, Workspace } from "@rbxts/services";
import { Events } from "client/events";

const COLLECTION_RANGE = 5;

@Controller({})
export default class ColelctableController implements OnInit {
    onInit() {
        RunService.Heartbeat.Connect(() => this.heartbeat());
    }

    heartbeat() {
        for (let collectable of Workspace.MapHolder.Spawnables.GetChildren()) {
            if (collectable.IsA("BasePart") && collectable.Name === "Coin") {
                const distance = Players.LocalPlayer.DistanceFromCharacter(collectable.Position);
                if (distance === 0 || distance > COLLECTION_RANGE) continue;
                Events.collectCoin.fire(collectable);
            }
        }
    }
}