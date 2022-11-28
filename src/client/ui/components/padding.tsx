import Roact from "@rbxts/roact"

interface IProps {
    Padding: number,
}

export default class Padding extends Roact.Component<IProps> {
    render() {
        return <uipadding
            PaddingBottom={new UDim(0, this.props.Padding)}
            PaddingLeft={new UDim(0, this.props.Padding)}
            PaddingRight={new UDim(0, this.props.Padding)}
            PaddingTop={new UDim(0, this.props.Padding)}
        >
        </uipadding>
    }
}