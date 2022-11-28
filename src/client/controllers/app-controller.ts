import { Controller, OnStart } from "@flamework/core";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import MainApp from "client/ui/apps/main";

@Controller({})
export default class AppController implements OnStart {
    onStart() {
        const screenGui = this.createScreenGui();
        Roact.mount(Roact.createElement(MainApp), screenGui);
    }

    private createScreenGui() {
        const screenGui = new Instance("ScreenGui");
        screenGui.ResetOnSpawn = false;
        screenGui.IgnoreGuiInset = true;
        screenGui.Parent = Players.LocalPlayer.WaitForChild("PlayerGui");

        return screenGui;
    }
}