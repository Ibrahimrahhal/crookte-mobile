import { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { Animated, Easing } from "react-native";
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function LottieAnimatedProgress(props: any) {
  const animationProgress = useRef(new Animated.Value(0));
  const [oldProg, setOldProg] = useState(0);
  useEffect(() => {
    if (props.progress === oldProg) return;
    if (!props.progress) return;
    animationProgress.current = new Animated.Value(oldProg);
    Animated.timing(animationProgress.current, {
      toValue: props.progress,
      duration: 600,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    setOldProg(props.progress);
  }, [props.progress]);
  return (
    <>
      <AnimatedLottieView
        {...props}
        progress={props.progress && animationProgress.current}
      />
    </>
  );
}
