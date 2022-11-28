import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Regen Coil",
    tool: ReplicatedStorage.Tools.RegenCoil,
})
export default class RegenCoil extends BaseTool {}