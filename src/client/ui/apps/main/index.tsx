import Roact from "@rbxts/roact"
import { Events } from "client/events"
import { AnimationType } from "types/enum/animation-type"
import Padding from "../../components/padding"
import LuckyblockSpinner from "./components/luckyblock-spinner"
import MapVoter from "./components/map-voter"
import { ITool } from "./components/tool-frame"

export default class MainApp extends Roact.Component<{}, {luckyBlockWinner: ITool}> {
    constructor(props: any) {
        super(props)
        Events.playAnimation.connect((animationType, data) =>  {
            if (animationType === AnimationType.Luckyblock) {
                data = data as ITool;
                this.setState({ luckyBlockWinner: data });
            }
        })
    }
    render() {
        return <frame
            BackgroundTransparency={1}
            Size={UDim2.fromScale(1, 1)}
        >
            <LuckyblockSpinner winner={this.state.luckyBlockWinner}/>
            <Padding Padding={10}/>
            <MapVoter/>
        </frame>
    }
}