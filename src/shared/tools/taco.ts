import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Taco",
    tool: ReplicatedStorage.Tools.Taco,
})
export default class Taco extends BaseTool {}