import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Ice Cream",
    tool: ReplicatedStorage.Tools.IceCreamCone,
})
export default class IceCream extends BaseTool {}