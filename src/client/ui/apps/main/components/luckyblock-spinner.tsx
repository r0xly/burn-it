import { Modding } from "@flamework/core";
import Roact from "@rbxts/roact";
import Flipper from "@rbxts/flipper";
import Frame from "client/ui/components/frame";
import { Tool } from "shared/modules/decorators/tool-decorator";
import ToolFrame, { ITool } from "./tool-frame";
import { getRandomTool } from "shared/util/get-random-tool";
import Theme from "client/ui/theme";
import { StarterGui } from "@rbxts/services";

interface IProps {
    winner: ITool | undefined,
}

export default class LuckyblockSpinner extends Roact.Component<IProps> {
    private tools: ITool[] = []; 
    private spinnerMotor = new Flipper.SingleMotor(0);
    private spinnerBinding: Roact.Binding<number>;
    private setSpinnerBinding: Roact.BindingFunction<number>;
    private positionMotor = new Flipper.SingleMotor(0);
    private positionBinding: Roact.Binding<number>;
    private setPositionBinding: Roact.BindingFunction<number>;

    constructor(props: IProps) {
        super(props);
        [this.positionBinding, this.setPositionBinding] = Roact.createBinding(this.positionMotor.getValue());
        [this.spinnerBinding, this.setSpinnerBinding] = Roact.createBinding(this.spinnerMotor.getValue());
        this.spinnerMotor.onStep(this.setSpinnerBinding);
        this.positionMotor.onStep(this.setPositionBinding);

        this.positionMotor.onComplete(() => {
            if (this.positionMotor.getValue() !== 1) return; 
            task.delay(0.1, () => {
                this.spinnerMotor.setGoal(new Flipper.Spring(1, {
                    frequency: 0.9,
                    dampingRatio: 0.6,
                }));
            });
        });

        this.spinnerMotor.onComplete(() => {
            if (this.spinnerMotor.getValue() !== 1) return;
            StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, true);
            task.delay(0.25, () => {
                this.positionMotor.setGoal(new Flipper.Spring(0, {
                    frequency: 5,
                    dampingRatio: 1,
                }));
            });
        });
    }

    render() {
        return <Frame
            Size={UDim2.fromOffset(610, 126)}
            Position={this.positionBinding.map(value => UDim2.fromScale(0.5, -0.5).Lerp(UDim2.fromScale(0.5, 0.5), value))}
            AnchorPoint={new Vector2(0.5, 0.5)}
        >
            <frame
                AnchorPoint={new Vector2(0.5, 0.5)}
                Position={UDim2.fromScale(0.5, 0.5)}
                Size={new UDim2(0, 6, 2, 0)}
                BackgroundColor3={Theme.white}
                BorderSizePixel={0}
                ZIndex={5}
            />
            <frame
                BackgroundTransparency={1}
                Size={UDim2.fromScale(1, 1)}
                Position={this.spinnerBinding.map(value => new UDim2().Lerp(new UDim2(-4, -21, 0, 0), value))}
            >
                <uilistlayout SortOrder={Enum.SortOrder.LayoutOrder} Padding={new UDim(0, 5)} FillDirection={Enum.FillDirection.Horizontal} />
                {this.tools.map(object => {
                    return <ToolFrame
                        Name={object.Name}
                        Icon={object.Icon}
                        Rarity={object.Rarity}
                    />
                })}
            </frame>
        </Frame>
    }

    spin(winner: ITool) {
        this.tools = [];

        for (let i = 0; i < 30; i++) {
            if (i === 22) {
                this.tools.push(winner);
            } else {
                const [randomTool, rarity] = getRandomTool();
                const decorator = Modding.getDecorator<typeof Tool>(randomTool);
    
                if (decorator) {
                    const [{ name, tool }] = decorator.arguments;
                    this.tools.push({
                        Icon: tool.TextureId,
                        Rarity: rarity,
                        Name: name,
                    })
                }
            }
        }
    }

    willUpdate(nextProps: IProps) {
        if (!nextProps.winner) return;
        this.spin(nextProps.winner);
        this.spinnerMotor.setGoal(new Flipper.Instant(0));
    }

    didUpdate() {
        StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false);
        this.positionMotor.setGoal(new Flipper.Spring(1, {
            frequency: 5,
            dampingRatio: 1,
        }));
    }
}