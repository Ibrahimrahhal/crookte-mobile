import { useState } from "react";
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

export default function AppTour() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visitedArray, setVisitedArray] = useState([false, false, false]);
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

          //   if (index == (Platform.OS === "ios" ? 2 : 0))
          //     setTimeout(() => {
          //       this.mailAnimation.play();
          //     }, 300);
          //   this.setState(this.state);
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
                <Button onPress={() => {}}>{t("getStartedAppTour")}</Button>
              </View>
            </Animatable.View>
          )}
        </View>
      </Swiper>
    </View>
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
  buttonStyle: {
    backgroundColor: "white",
  },
  titleStyle: {
    color: config.mainColor,
  },
  buttuonContainerStyle: {
    position: "absolute",
    bottom: "10%",
  },
});
