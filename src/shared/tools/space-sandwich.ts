import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Space Sandwhich",
    tool: ReplicatedStorage.Tools.SpaceSandwich,
})
export default class SpaceSandwich extends BaseTool {}