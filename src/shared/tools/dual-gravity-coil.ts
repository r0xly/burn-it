import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Dual Gravity Coil",
    tool: ReplicatedStorage.Tools.DualGravityCoil,
})
export default class DualGravityCoil extends BaseTool {}