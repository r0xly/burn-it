import { BaseTool } from "shared/modules/decorators/tool-decorator";
import BanHammer from "shared/tools/ban-hammer";
import BloxyCola from "shared/tools/bloxy-cola";
import DualGravityCoil from "shared/tools/dual-gravity-coil";
import FlintAndSteal from "shared/tools/flint-and-steal";
import GravityCoil from "shared/tools/gravity-coil";
import HealingPotion from "shared/tools/healing-potion";
import IceCream from "shared/tools/ice-cream-cone";
import PaintballGun from "shared/tools/paintball-gun";
import PizzaBox from "shared/tools/pizza-box";
import RegenCoil from "shared/tools/regen-coil";
import RocketLauncher from "shared/tools/rocket-launcher";
import Slingshot from "shared/tools/slingshot";
import Snowball from "shared/tools/snowball";
import SnowyGravityCoil from "shared/tools/snowy-gravity-coil";
import SpaceSandwich from "shared/tools/space-sandwich";
import SpeedCoil from "shared/tools/speed-coil";
import Taco from "shared/tools/taco";

export const LuckyblockMeta: {[key: string]: {Chance: number, Tools: typeof BaseTool[]}} = {
    Common: {
        Chance: 35,
        Tools: [BloxyCola, SpaceSandwich, Taco, HealingPotion, PizzaBox, IceCream],
    }, 
    Uncommon: {
        Chance: 38,
        Tools: [Snowball, FlintAndSteal],
    }, 
    Rare: {
        Chance: 10,
        Tools: [DualGravityCoil, SnowyGravityCoil, SpeedCoil, RegenCoil, GravityCoil],
    }, 
    Epic: {
        Chance: 12,
        Tools: [RocketLauncher, PaintballGun, Slingshot],
    }, 
    Legendary: {
        Chance: 5,
        Tools: [BanHammer],
    }, 
}