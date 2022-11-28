import { ReplicatedStorage } from "@rbxts/services";
import { Tool, BaseTool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Snowball",
    tool: ReplicatedStorage.Tools.Snowball,
})
export default class Snowball extends BaseTool {
    onEquip() {
        print(`equipped ${this.tool.Name}`);
    }

    onUnequip() {
        print(`equipped ${this.tool.Name}`);
    }
}
