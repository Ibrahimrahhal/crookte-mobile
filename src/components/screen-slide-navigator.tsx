import { FC, useState } from "react";
import { View } from "react-native-animatable";

export default function ScreenSlideNavigator(props: {
  screens: FC<{ moveTo: () => void; state: any; updateState: any }>[];
  moveNext: () => void;
  state: { [key: number]: any };
  updateState: any;
  currentActive: number;
  numberOfCars: number;
  currentActiveIndex: number;
}) {
  const [isHiding, setIsHiding] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const CurrentActiveScreen: any = props.screens[props.currentActiveIndex];
  return (
    <View
      style={{ flex: 1 }}
      animation={
        isHiding ? "fadeOutRight" : isShowing ? "fadeInLeft" : undefined
      }
      onAnimationEnd={() => {
        if (isHiding) {
          setIsHiding(false);
          props.moveNext();
          setIsShowing(true);
        }
      }}
    >
      <CurrentActiveScreen
        state={props.state[props.currentActive] || {}}
        currentActiveCar={props.currentActive}
        numberOfCars={props.numberOfCars}
        updateState={(state: any) => {
          props.updateState({
            ...props.state,
            [props.currentActive]: state,
          });
        }}
        moveTo={() => {
          setIsHiding(true);
          setIsShowing(false);
        }}
      />
    </View>
  );
}
