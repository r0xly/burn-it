import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Rocket Launcher",
    tool: ReplicatedStorage.Tools.RocketLauncher,
})
export default class RocketLauncher extends BaseTool {}