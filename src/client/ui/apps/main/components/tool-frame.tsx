/* eslint-disable prettier/prettier */
import Roact from "@rbxts/roact"
import Theme from "client/ui/theme";
import { rarity } from "types/types/rarity";

export interface ITool {
    Icon: string,
    Name: string,
    Rarity: rarity,
}

const colors = new Map<rarity, Color3>();
colors.set("commmon", Theme.white);
colors.set("uncommon", Theme.green500);
colors.set("rare", Theme.blue400);
colors.set("epic", Theme.purple800);
colors.set("legendary", Theme.orange500);

export default class ToolFrame extends Roact.Component<ITool> {
    render() {
        return <frame
            Size={UDim2.fromScale(1, 1)}
            BackgroundColor3={colors.get(this.props.Rarity)}
        > 
            <uiaspectratioconstraint/>
            <uicorner CornerRadius={new UDim(0, 19)}/>
            <imagelabel 
                Position={UDim2.fromScale(0.5, 0.5)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundTransparency={1}
                Size={UDim2.fromOffset(100, 100)}
                Image={this.props.Icon}
            />

            <frame
                BackgroundTransparency={0.3}
                Size={UDim2.fromScale(1, 0.8)}
                BackgroundColor3={Theme.black}
                AnchorPoint={new Vector2(0, 1)}
                Position={UDim2.fromScale(0, 1)}
                ZIndex={2}
            >
                <uicorner CornerRadius={new UDim(0, 19)}/>
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
                Text={this.props.Name}
                TextWrapped={true}
            />
        </frame>
    }
}
