import { LuckyblockMeta } from "shared/meta/luckyblock-meta";
import { BaseTool } from "shared/modules/decorators/tool-decorator";
import { rarity } from "types/types/rarity";

export function getRandomTool(): [typeof BaseTool, rarity] {
    const chance = math.random(0, 100);
    const common = LuckyblockMeta.Common.Chance;
    const uncommon = LuckyblockMeta.Uncommon.Chance;
    const rare = LuckyblockMeta.Rare.Chance;
    const epic = LuckyblockMeta.Epic.Chance;
    const legendary = LuckyblockMeta.Legendary.Chance;
    let tools = LuckyblockMeta.Common.Tools;
    let rarity: rarity = "commmon";
    
    if (chance < common) tools = LuckyblockMeta.Common.Tools;
    else if (chance < common + uncommon) { tools = LuckyblockMeta.Uncommon.Tools; rarity = "uncommon" }
    else if (chance < common + uncommon + rare) { tools = LuckyblockMeta.Rare.Tools; rarity = "rare" }
    else if (chance < common + uncommon + rare + epic) { tools = LuckyblockMeta.Epic.Tools; rarity = "epic" }
    else if (chance < common + uncommon + rare + epic + legendary) { tools = LuckyblockMeta.Legendary.Tools; rarity = "legendary" }
   
    return [tools[math.random(0, tools.size() - 1)], rarity];
}