import Roact from "@rbxts/roact";
import { Events } from "client/events";
import Theme from "client/ui/theme";
import { MapOption } from "./map-voter";

export default class MapButton extends Roact.Component<{mapOption: MapOption}> {
    render() {
        return <textbutton
            BackgroundTransparency={1}
            Event={{ MouseButton1Up: () => { Events.voteMap(this.props.mapOption.name) }}}
            Size={new UDim2(0, 200, 1, 0)}
            Text=""
        >
            <frame
                BackgroundTransparency={0.3}
                Size={UDim2.fromScale(1, 0.8)}
                BackgroundColor3={Theme.black}
                AnchorPoint={new Vector2(0, 1)}
                Position={UDim2.fromScale(0, 1)}
                ZIndex={2}
            >
                <uicorner CornerRadius={new UDim(0, 17)} />
                <uigradient
                    Rotation={-90}
                    Transparency={new NumberSequence([
                        new NumberSequenceKeypoint(0, 0),
                        new NumberSequenceKeypoint(0.5, 1),
                        new NumberSequenceKeypoint(1, 1),
                    ])}
                />
            </frame>

            <textlabel
                BackgroundTransparency={1}
                AnchorPoint={new Vector2(0, 1)}
                Position={UDim2.fromScale(0, 1)}
                Font={Theme.fontNormal}
                TextColor3={Theme.white}
                TextSize={20}
                ZIndex={3}
                Size={UDim2.fromScale(1, 0.3)}
                Text={this.props.mapOption.name + ` (${this.props.mapOption.voteCount})`}
                TextWrapped={true}
            />
            <imagelabel
                Size={UDim2.fromScale(1, 1)}
                BackgroundColor3={Theme.black}
                Image={this.props.mapOption.icon}
            >
                <uicorner CornerRadius={new UDim(0, 17)} />

            </imagelabel>
        </textbutton>
    }
}