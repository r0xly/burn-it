import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { RunService } from "@rbxts/services";

const ROTATION_SPEED = 1;

@Component({})
export class CoinEffect extends BaseComponent<{}, BasePart> implements OnStart {
    onStart() {
        this.maid.GiveTask(RunService.RenderStepped.Connect((dt) => {
            this.instance.CFrame = this.instance.CFrame.mul(CFrame.Angles(-ROTATION_SPEED * dt, 0, 0));
        }));
    }
}