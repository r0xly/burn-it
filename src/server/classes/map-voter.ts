import Maid from "@rbxts/maid";
import { ReplicatedStorage } from "@rbxts/services";
import { Events } from "server/events";

const MAPS_FOLDER = ReplicatedStorage.Maps.GetChildren();

interface IMap {
    model: Model,
    voters: Player[],
}

export default class MapVoter {
    public options: IMap[];
    private maid: Maid;

    constructor() {
        this.options = this.getRandomMaps(3);
        this.maid = new Maid();

        const _the_chosen_ones_: Model[] = [];

        this.options.forEach(map => { _the_chosen_ones_.push(map.model) });
        Events.mapOptions.broadcast(_the_chosen_ones_);

        this.maid.GiveTask(Events.voteMap.connect((player, name) => {
            this.options.forEach(map => {
                if (map.model.Name !== name) {
                    for (let i = 0; i < map.voters.size(); i++) {
                        const element = map.voters[i];
                        
                        if (element === player) {
                            map.voters.remove(i);
                            map.model.SetAttribute("Votes", (map.model.GetAttribute("Votes") as number || 0) - 1)
                        }
                    }

                } else if (map.model.Name === name && map.voters.indexOf(player) === -1) {
                    map.voters.push(player);
                    map.model.SetAttribute("Votes", (map.model.GetAttribute("Votes") as number || 0) + 1)
                }
            });
        }));
    }

    getRandomMaps(numberOfMaps: number) {
        const maps: IMap[] = [];

        while (maps.size() !== 3) {
            const randomMap = MAPS_FOLDER[math.random(0, MAPS_FOLDER.size() - 1)] as Model;
            randomMap.SetAttribute("Votes", 0)

            let mapAlreadyUsedFfsINeedShorterVariableNames = false; 

            maps.forEach(map => {
                if (randomMap === map.model) 
                    mapAlreadyUsedFfsINeedShorterVariableNames = true;
            });

            if (!mapAlreadyUsedFfsINeedShorterVariableNames) {
                randomMap.SetAttribute("Votes", 0);
                maps.push({
                    model: randomMap,
                    voters: [],
                });
            }
        } 

        return maps;
    }

    getWinner() {
        let largestNumber = 0;
        let winner = this.options[0].model;

        this.options.forEach(map => {
            if (map.voters.size() > largestNumber) {
                largestNumber = map.voters.size()
                winner = map.model;
            } 
        });

        return winner;
    }

    destroy() {
        this.maid.Destroy();
    }
}