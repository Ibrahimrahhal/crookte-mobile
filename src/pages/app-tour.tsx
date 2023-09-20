import { Fragment, useEffect, useRef, useState } from "react";
import t from "home/utils/i18n";
import { View, StyleSheet, Dimensions } from "react-native";
import { Button, Text } from "react-native-paper";
import config from "configs";
import { statusBarHeight } from "home/utils/generic";
import Swiper from "react-native-swiper";
import * as Animatable from "react-native-animatable";
import FirstSlideInAppTour from "home/sections/app-tour/first-slide";
import SecondSlideInAppTour from "home/sections/app-tour/second-slide";
import LottieView from "lottie-react-native";
import sendMail from "assets/animations/send-mail.json";
import SwipeAnimation from "assets/animations/swiper-hint.json";
import { StatusBar } from "expo-status-bar";
import RequestPoliceImage from "assets/imgs/requestPol.svg";

function AppTourSwiper({
  setActiveIndex,
  navigate,
}: {
  setActiveIndex: (index: number) => void;
  navigate: () => void;
}) {
  const [visitedArray, setVisitedArray] = useState([
    false,
    false,
    false,
    false,
  ]);
  return (
    <View style={styles.upperLevelContainer}>
      <View style={styles.safeArea}></View>
      <Swiper
        loop={false}
        containerStyle={styles.wrapper}
        onIndexChanged={(index) => {
          setActiveIndex(index);
          visitedArray[index] = true;
          setVisitedArray([...visitedArray]);
        }}
        showsPagination={false}
      >
        <View style={styles.slideContainer}>
          <Animatable.View style={styles.slideContainer} animation={"fadeIn"}>
            <Animatable.View
              style={styles.upperSliderHalf}
              animation={"slideInDown"}
              delay={200}
            >
              <FirstSlideInAppTour
                height={Dimensions.get("window").height * 0.5 * 0.8}
                width={Dimensions.get("window").width}
              />
            </Animatable.View>
            <View style={styles.secondHalf}>
              <Text style={{ ...styles.text }} variant="headlineSmall">
                {t("readyInFewSteps")}
              </Text>
              <Text
                style={{ ...styles.text, ...styles.smallText }}
                variant="bodyLarge"
              >
                {t("readInFewStepsDesc")}
              </Text>
            </View>
          </Animatable.View>
        </View>
        <View style={styles.slideContainer}>
          {visitedArray[1] && (
            <Animatable.View style={styles.slideContainer} animation={"fadeIn"}>
              <Animatable.View
                style={styles.upperSliderHalf}
                animation={"slideInDown"}
                delay={200}
              >
                <SecondSlideInAppTour
                  width={Dimensions.get("window").width * 0.85}
                />
              </Animatable.View>
              <View style={styles.secondHalf}>
                <Text style={{ ...styles.text }} variant="headlineSmall">
                  {t("documentsPicturesAppTour")}
                </Text>
                <Text
                  style={{ ...styles.text, ...styles.smallText }}
                  variant="bodyLarge"
                >
                  {t("documentsPicturesAppTourDesc")}
                </Text>
              </View>
            </Animatable.View>
          )}
        </View>
        <View style={styles.slideContainer}>
          {visitedArray[2] && (
            <Animatable.View style={styles.slideContainer} animation={"fadeIn"}>
              <Animatable.View
                style={styles.upperSliderHalf}
                animation={"slideInDown"}
                delay={200}
              >
                <LottieView
                  autoPlay={true}
                  style={{
                    height: Dimensions.get("window").height * 0.5 * 0.8,
                    alignItems: "center",
                  }}
                  loop
                  source={sendMail}
                />
              </Animatable.View>
              <View style={styles.secondHalf}>
                <Text style={{ ...styles.text }} variant="headlineSmall">
                  {t("waitForTheReportAppTour")}
                </Text>
                <Text
                  style={{ ...styles.text, ...styles.smallText }}
                  variant="bodyLarge"
                >
                  {t("waitForTheReportAppTourDesc")}
                </Text>
              </View>
            </Animatable.View>
          )}
        </View>
        <View style={styles.slideContainer}>
          {visitedArray[3] && (
            <Animatable.View style={styles.slideContainer} animation={"fadeIn"}>
              <Animatable.View
                style={styles.upperSliderHalf}
                animation={"slideInDown"}
                delay={200}
              >
                <RequestPoliceImage
                  width={Dimensions.get("window").width}
                  height={Dimensions.get("window").height * 0.5 * 0.8}
                />
              </Animatable.View>
              <View style={styles.secondHalf}>
                <Text style={{ ...styles.text }} variant="headlineSmall">
                  {t("RequestPoliceAppTour")}
                </Text>
                <Text
                  style={{ ...styles.text, ...styles.smallText }}
                  variant="bodyLarge"
                >
                  {t("RequestPoliceAppTourHelp")}
                </Text>
                <Animatable.View
                  animation={"fadeInUp"}
                  delay={1000}
                  style={styles.showButtonWrapper}
                >
                  <Button
                    onPress={() => {
                      navigate();
                    }}
                    style={styles.submitButton}
                  >
                    {t("getStartedAppTour")}
                  </Button>
                </Animatable.View>
              </View>
            </Animatable.View>
          )}
        </View>
      </Swiper>
    </View>
  );
}

export default function AppTour({ navigation }: any) {
  const [activeSlide, setActiveSlide] = useState(0);
  const swipeHintAnimation = useRef<LottieView>(null);
  useEffect(() => {
    setTimeout(() => swipeHintAnimation.current?.play(), 2000);
  }, []);
  return (
    <Fragment>
      <View style={styles.heighContainer}>
        <View style={styles.innerView}>
          <AppTourSwiper
            setActiveIndex={setActiveSlide}
            navigate={() => {
              navigation.navigate("HomeNavigator");
            }}
          />
        </View>
        {activeSlide !== 3 && (
          <View style={{ ...styles.swipHintContainer } as any}>
            <LottieView
              ref={swipeHintAnimation}
              style={{
                height: 100,
                alignItems: "center",
              }}
              loop={false}
              onAnimationFinish={() => {
                setTimeout(() => swipeHintAnimation.current?.play(), 2000);
              }}
              source={SwipeAnimation}
            />
          </View>
        )}
      </View>
      <StatusBar style={"light"} />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  upperLevelContainer: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    backgroundColor: config.mainColor,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    direction: "rtl",
    flexDirection: "row-reverse",
    flex: 1,
  },
  safeArea: {
    width: "100%",
    height: statusBarHeight,
    backgroundColor: config.mainColor,
  },
  upperSliderHalf: {
    height: "50%",
    // backgroundColor:'rgba(0,0,0,0.1)',
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
  secondHalf: {
    height: "50%",
    width: "100%",
    padding: "3%",
    alignItems: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 40,
  },
  smallText: {
    marginTop: 20,
    fontWeight: "normal",
  },
  heighContainer: {
    flex: 1,
    backgroundColor: config.mainColor,
  },
  innerView: {
    flex: 1,
  },
  swipHintContainer: {
    position: "absolute",
    bottom: "6%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  submitButton: {
    backgroundColor: "white",
    width: "90%",
  },
  showButtonWrapper: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    alignItems: "center",
  },
});
