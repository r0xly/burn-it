import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Slingshot",
    tool: ReplicatedStorage.Tools.Slingshot,
})
export default class Slingshot extends BaseTool {}