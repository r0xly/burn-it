import { Modding } from "@flamework/core";

export class BaseTool {
    tool: Tool;

    constructor(tool: Tool) {
        this.tool = tool;
    }

    onEquip() {}; 
    onUnequip() {}; 
    onActivated() {};
}

export interface IToolConfig {
    name: string, 
    tool: Tool,
}

export const Tool = Modding.createMetaDecorator<[IToolConfig]>("Class");