import { BaseComponent, Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { Players, TextService, TweenService } from "@rbxts/services";
import { CoinEffect } from "./coin-effect";

const tweenInfo = new TweenInfo(0.5, Enum.EasingStyle.Quint, Enum.EasingDirection.Out);

@Component({})
export default class CollectEffect extends BaseComponent<{}, BasePart> implements OnStart {
    private components = Dependency<Components>();
    onStart() {
        if (this.components.getComponent<CoinEffect>(this.instance)) this.components.removeComponent<CoinEffect>(this.instance); 

        TweenService.Create(this.instance, tweenInfo, {
            Transparency: 1,
            //CFrame: (Players.LocalPlayer.Character?.FindFirstChild("HumanoidRootPart") as BasePart).CFrame,
        }).Play();

        for (let child of this.instance.GetDescendants()) {
            if (child.IsA("ParticleEmitter") || child.IsA("PointLight")) child.Destroy();
        }

        const sound = this.instance.FindFirstChild("Sound");
        if (sound && sound.IsA("Sound")) sound.Play();
    }
}