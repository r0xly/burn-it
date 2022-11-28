import { Components } from "@flamework/components";
import { Controller, OnStart, OnInit, Dependency } from "@flamework/core";
import { Workspace } from "@rbxts/services";
import { BurningEffect } from "client/components/effects/burn-effect";
import { CoinEffect } from "client/components/effects/coin-effect";
import CollectEffect from "client/components/effects/collect-effect";
import { Events } from "client/events";
import { AnimationType } from "types/enum/animation-type";

@Controller({})
export class EffectsController implements OnInit {
    private components = Dependency<Components>();

    onInit() {
       Workspace.MapHolder.Spawnables.ChildAdded.Connect((i) => this.onSpawnableAdded(i));
       Events.burn.connect((part) => this.components.addComponent<BurningEffect>(part));
       Events.playAnimation.connect((a, d) => this.onAnimationEvent(a, d));
    }

    private onSpawnableAdded(instance: Instance) {
        if (instance.IsA("BasePart") && instance.Name === "Coin") this.components.addComponent<CoinEffect>(instance);
    }

    private onAnimationEvent(animation: AnimationType, data: any) {
        if (animation === AnimationType.Collect) this.components.addComponent<CollectEffect>(data as BasePart);
    }
}