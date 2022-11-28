import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { ReplicatedStorage, TweenService } from "@rbxts/services";

const a = 0.7;
const tweenInfo = new TweenInfo(15, Enum.EasingStyle.Quint, Enum.EasingDirection.Out);

@Component({})
export class BurningEffect extends BaseComponent<{}, BasePart> implements OnStart {
    onStart() {
        const goalColor = this.instance.Color.Lerp(new Color3(0, 0, 0), a);
        TweenService.Create(this.instance, tweenInfo, { Color: goalColor }).Play();
        ReplicatedStorage.GameAssets.Fire.Clone().Parent = this.instance;

        task.delay(19, () => {
            const tweenInfo = new TweenInfo(1, Enum.EasingStyle.Linear);
            (this.instance.FindFirstChild("Fire") as ParticleEmitter).Enabled = false;
            TweenService.Create(this.instance, tweenInfo, { Transparency: 1 }).Play();
        });
    }
}

