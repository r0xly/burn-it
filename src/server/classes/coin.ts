import { ReplicatedStorage, Workspace } from "@rbxts/services";

const SPAWN_OFFSET = new Vector3(0, 1.5, 0);

export default class Coin {
    private readonly part = ReplicatedStorage.GameAssets.Coin.Clone();

    constructor(position: Vector3) {
        this.part.Position = position.add(SPAWN_OFFSET);
        this.part.Parent = Workspace.MapHolder.Spawnables;
    }
}