import { Controller, OnStart, OnInit, Modding } from "@flamework/core";
import { ReplicatedStorage } from "@rbxts/services";
import { Events } from "client/events";

@Controller({})
export class ToolController implements OnInit {
    onInit() {
        Events.toolAdded.connect((t, n) => this.onToolAdded(t, n));
    }

    private onToolAdded(toolInstance: Tool, name: String) {
        ReplicatedStorage.TS.tools.GetChildren().forEach(tool => {
            if (!tool.IsA("ModuleScript")) return;
            
        });
    }
}