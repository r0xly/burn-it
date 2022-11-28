import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Gravity Coil",
    tool: ReplicatedStorage.Tools.GravityCoil,
})
export default class GravityCoil extends BaseTool {}