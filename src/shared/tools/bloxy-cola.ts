import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Bloxy Cola",
    tool: ReplicatedStorage.Tools.BloxyCola,
})
export default class BloxyCola extends BaseTool {}