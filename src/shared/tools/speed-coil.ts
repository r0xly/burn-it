import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Speed Coil",
    tool: ReplicatedStorage.Tools.SpeedCoil,
})
export default class SpeedCoil extends BaseTool {}