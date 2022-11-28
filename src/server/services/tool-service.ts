import { Modding, Service } from "@flamework/core";
import { Events } from "server/events";
import PlayerEntity from "server/classes/player-entity";
import { Tool, BaseTool } from "shared/modules/decorators/tool-decorator";

@Service()
export class ToolService {
    public giveTool(entity: PlayerEntity, object: typeof BaseTool) {
        const backpack = entity.player.WaitForChild("Backpack") as Folder;
        const decorator = Modding.getDecorator<typeof Tool>(object);

        if (decorator) {
            const [{ name, tool }] = decorator.arguments;
            const newTool = tool.Clone();
            newTool.Name = name;
            newTool.Parent = backpack;
            
            Events.toolAdded(entity.player, newTool, name);
        }

    }

    public getTool(entity: PlayerEntity, object: typeof BaseTool) {
        const backpack = entity.player.WaitForChild("Backpack") as Folder;
        const decorator = Modding.getDecorator<typeof Tool>(object);

        if (decorator) {
            const [{name}] = decorator.arguments;
            return backpack.FindFirstChild(name);
        }
    }
}