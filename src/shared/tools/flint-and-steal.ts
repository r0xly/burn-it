import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Flint and Steel",
    tool: ReplicatedStorage.Tools.FlintAndSteel,
})
export default class FlintAndSteal extends BaseTool {}