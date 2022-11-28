import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Snowy Gravity Coil",
    tool: ReplicatedStorage.Tools.SnowyGravityCoil,
})
export default class SnowyGravityCoil extends BaseTool {}