import Roact from "@rbxts/roact";
import Theme from "../theme";
import Padding from "./padding";

interface IProps {
    Size: UDim2 | Roact.Binding<UDim2>,
    Position: UDim2 | Roact.Binding<UDim2>,
    AnchorPoint: Vector2, 
}

export default class Frame extends Roact.Component<IProps> {
    render() {
        return (
            <frame
                Size={this.props.Size}
                Position={this.props.Position}
                AnchorPoint={this.props.AnchorPoint}
                BackgroundColor3={Theme.black}
                BackgroundTransparency={0.5}
                ClipsDescendants={true}
            >
                <Padding Padding={5}/>
                <uicorner CornerRadius={new UDim(0, 20)}/>
                {this.props[Roact.Children]}
            </frame>
        )
    }
}