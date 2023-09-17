import { FC, useState } from "react";
import { View } from "react-native-animatable";

export default function ScreenSlideNavigator(props: {
  screens: FC<{ moveTo: () => void }>[];
  moveNext: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHiding, setIsHiding] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const CurrentActiveScreen = props.screens[activeIndex];
  return (
    <View
      style={{ flex: 1 }}
      animation={
        isHiding ? "fadeOutRight" : isShowing ? "fadeInLeft" : undefined
      }
      onAnimationEnd={() => {
        if (isHiding) {
          setIsHiding(false);
          setActiveIndex(activeIndex + 1);
          props.moveNext();
          setIsShowing(true);
        }
      }}
    >
      <CurrentActiveScreen
        moveTo={() => {
          setIsHiding(true);
          setIsShowing(false);
        }}
      />
    </View>
  );
}
