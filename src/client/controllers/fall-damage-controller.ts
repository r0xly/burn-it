import { Controller, OnStart, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";

const DAMANGE_MULTIPLYER = 1;
const MIN_HEIGHT = -15;

@Controller({})
export class FallDamageController implements OnInit {
    private fallHeight = 0;
    private humanoid: Humanoid | undefined;
    private rootPart: BasePart | undefined;
    private character: Model | undefined;

    onInit() {
        Players.LocalPlayer.CharacterAdded.Connect(c => this.onCharacterAdded(c));
    }

    private onCharacterAdded(character: Model) {
        const humanoid = character.WaitForChild("Humanoid") as Humanoid;
        const rootPart = character.WaitForChild("HumanoidRootPart") as BasePart;
        this.character = character;
        this.humanoid = humanoid;
        this.rootPart = rootPart;

        humanoid.StateChanged.Connect((o, n) => this.onStateChange(o, n));
    }

    private onStateChange(oldState: Enum.HumanoidStateType, newState: Enum.HumanoidStateType) {
        if (!this.character || !this.humanoid || !this.rootPart || !this.character.FindFirstChild("INGAME")) return;

        if (newState === Enum.HumanoidStateType.Freefall) {
            this.fallHeight = this.rootPart.Position.Y;
        } else if (newState === Enum.HumanoidStateType.Landed) {
            const heightDiffernce = this.rootPart.Position.Y - this.fallHeight;
            const tool = this.rootPart.Parent?.FindFirstChildOfClass("Tool");
            const isGravityCoil = tool && tool.Name.lower().find("gravity");

            if (heightDiffernce < MIN_HEIGHT && !isGravityCoil) this.humanoid.TakeDamage(-heightDiffernce * DAMANGE_MULTIPLYER); 
        }
    }
}