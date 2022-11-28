import { ReplicatedStorage } from "@rbxts/services";
import { BaseTool, Tool } from "shared/modules/decorators/tool-decorator";

@Tool({
    name: "Pizza Box",
    tool: ReplicatedStorage.Tools.PizzaBox,
})
export default class PizzaBox extends BaseTool {}