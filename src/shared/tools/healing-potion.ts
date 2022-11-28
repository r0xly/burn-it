import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Healing Potion",
    tool: ReplicatedStorage.Tools.HealingPotion,
})
export default class HealingPotion extends BaseTool {}