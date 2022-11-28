import { Dependency, OnInit, Service } from "@flamework/core";
import { Event } from "@rbxts/roact";
import { Debris, Players } from "@rbxts/services";
import { Events } from "server/events";
import { AnimationType } from "types/enum/animation-type";
import { DataService } from "./data-service";

const COLLECTION_RANGE = 5;

@Service({})
export default class CollectableService implements OnInit {
    private dataService = Dependency<DataService>();
    
    onInit() {
        Events.collectCoin.connect((player, coin) => this.onCoinCollectRequest(player, coin));
    }

    onCoinCollectRequest(player: Player, coin: BasePart) {
        const distance = player.DistanceFromCharacter(coin.Position);

        if (coin.Name === "Coin" && distance !== 0 && distance < COLLECTION_RANGE) {
            coin.Name = "DeadCoin";
            Events.playAnimation.broadcast(AnimationType.Collect, coin);
            
            Debris.AddItem(coin, 1);
            this.dataService.giveCoins(player, 1);
        }
    }
}