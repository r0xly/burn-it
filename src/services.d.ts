interface ReplicatedStorage extends Instance {
    Maps: Folder,
    Events: Folder & {
        Burn: RemoteEvent,
        Winners: RemoteEvent,
    },
    GameAssets: Folder & {
        Coin: BasePart,
        Fire: ParticleEmitter,
        Luckyblock: BasePart,
    }
    Tools: Folder & {
        SpeedCoil: Tool,
        BloxyCola: Tool,
        DualGravityCoil: Tool,
        GravityCoil: Tool,
        HealingPotion: Tool,
        IceCreamCone: Tool,
        PizzaBox: Tool,
        RegenCoil: Tool,
        Snowball: Tool,
        SnowyGravityCoil: Tool,
        BanHammer: Tool,
        Slingshot: Tool,
        PaintballGun: Tool,
        RainbowCarpet: Tool,
        FlintAndSteel: Tool,
        SpaceSandwich: Tool,
        Taco: Tool,
        RocketLauncher: Tool,
    }
    TS: Folder & {
        tools: Folder,
    }
}

interface Workspace extends Instance {
    MapHolder: Folder & {
        Map: Folder,
        Spawnables: Folder,
    },
    Ground: BasePart,
}