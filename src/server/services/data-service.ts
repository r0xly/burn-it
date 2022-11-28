import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { Players } from "@rbxts/services";
import Signal from "@rbxts/signal";

const ProfileTemplate = {
    Coins: 0,
}

type ProfileType = Profile<typeof ProfileTemplate>;
 
@Service({})
export class DataService implements OnStart, OnInit {
    private profileStore = ProfileService.GetProfileStore("PlayerData", ProfileTemplate);
    private profiles = new Map<Player, ProfileType>();
    public coinsChanged = new Signal<(Player: Player, Value: number) => void>();

    onInit() {
        Players.PlayerAdded.Connect((p) => this.onPlayerJoined(p)); 
        Players.GetPlayers().forEach(player => this.onPlayerJoined(player));
    }

    onStart() {
        
    }

    private onPlayerJoined(player: Player) {
        const profile = this.profileStore.LoadProfileAsync(`Player_${player.UserId}`);

        if (profile !== undefined) {
            profile.AddUserId(player.UserId);
            profile.Reconcile();
            profile.ListenToRelease(() => {
                this.profiles.delete(player);
                player.Kick();
            });

            if (player.IsDescendantOf(Players)) {
                this.profiles.set(player, profile);
                (player.WaitForChild("leaderstats").WaitForChild("Coins") as IntValue).Value = this.getCoins(player);
            } else {
                profile.Release();
            }
        } else {
            player.Kick("Failed to load data. Sorry :(");
        }
    }

    public getProfile(player: Player) {
        return this.profiles.get(player);
    }

    public getCoins(player: Player) {
        const profile = this.getProfile(player);
        let coins = 0;

        if (profile && profile.Data.Coins) {
            coins = profile.Data.Coins;
        }

        return coins;
    }

    public giveCoins(player: Player, amount: number) {
        const profile = this.getProfile(player);
            
        if (profile) {
            if (!profile.Data.Coins) {
                profile.Data.Coins = 0;
            } 

            profile.Data.Coins += amount;
            this.coinsChanged.Fire(player, this.getCoins(player));
        }
    }
}