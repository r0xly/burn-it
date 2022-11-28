import Flipper from "@rbxts/flipper"
import Roact from "@rbxts/roact";
import { ReplicatedStorage } from "@rbxts/services";
import { Events } from "client/events";
import Frame from "client/ui/components/frame";
import { GameStatus } from "types/enum/game-status";
import MapButton from "./map-button";

export type MapOption = {
    name: string,
    icon: string,
    voteCount: number,
}

export default class MapVoter extends Roact.Component<{}, { mapOptions: MapOption[] }> {
    private positionMotor = new Flipper.SingleMotor(0);
    private positionBinding: Roact.Binding<number>;
    private setPositionBinding: Roact.BindingFunction<number>;

    constructor(props: {}) {
        super(props);
        [this.positionBinding, this.setPositionBinding] = Roact.createBinding(this.positionMotor.getValue());
        this.positionMotor.onStep(this.setPositionBinding);

        this.setState({ mapOptions: [] });

        ReplicatedStorage.GetAttributeChangedSignal("Status").Connect(() => {
            if (ReplicatedStorage.GetAttribute("Status") === GameStatus.MapVoting) this.open()
            else this.close();
        });

        
        Events.mapOptions.connect((maps) => {
            const options: MapOption[] = [];

            for (let i = 0; i < maps.size(); i++) {
                const model = maps[i];
                
                options.push({
                    name: model.Name,
                    voteCount: model.GetAttribute("Votes") as number,
                    icon: model.GetAttribute("image") as string,
                });
                
                const eye = options.size() - 1;
                model.GetAttributeChangedSignal("Votes").Connect(() => {
                    options[eye] = {
                        name: model.Name,
                        voteCount: model.GetAttribute("Votes") as number,
                        icon: model.GetAttribute("image") as string,
                    }

                    this.setState({mapOptions: options});
                });

            }
            
            this.setState({mapOptions: options});
        });
    }

    render()
    {
        return <Frame
            Size={UDim2.fromOffset(620, 200)}
            Position={this.positionBinding.map(value => UDim2.fromScale(0.5, -0.5).Lerp(UDim2.fromScale(0.5, 0.5), value))}
            AnchorPoint={new Vector2(0.5, 0.5)}
        >

            <frame
                BackgroundTransparency={1}
                Size={UDim2.fromScale(1, 1)}
            >
                <uilistlayout
                    FillDirection={Enum.FillDirection.Horizontal}
                    Padding={new UDim(0, 5)}
                />

                {this.state.mapOptions.map(option => {
                    return <MapButton mapOption={option}/>
                })}
            </frame>
        </Frame>
    }

    private close() {
        this.positionMotor.setGoal(new Flipper.Spring(0, {
            frequency: 5,
            dampingRatio: 1,
        }));
    }

    private open() {
        this.positionMotor.setGoal(new Flipper.Spring(1, {
            frequency: 5,
            dampingRatio: 1,
        }));
    }
}