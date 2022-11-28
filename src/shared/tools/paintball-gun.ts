import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Paintball Gun",
    tool: ReplicatedStorage.Tools.PaintballGun,
})
export default class PaintballGun extends BaseTool {}