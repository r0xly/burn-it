import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Ban Hammer",
    tool: ReplicatedStorage.Tools.BanHammer,
})
export default class BanHammer extends BaseTool {}