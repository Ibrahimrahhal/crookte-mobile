import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import DrivingCar from "assets/animations/car-driving.json";
import config from "configs";
import { statusBarHeight } from "home/utils/generic";
import { Text, Button } from "react-native-paper";
import Login from "home/sections/auth/login";

const Tab = createMaterialTopTabNavigator();

export default function Auth() {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topSideView}>
        <View style={styles.safeArea}></View>
        <View style={styles.animationContainer}>
          <LottieView
            ref={animationRef}
            style={{
              height: Dimensions.get("window").height / 3,
              width: Dimensions.get("window").width,
              alignItems: "center",
            }}
            source={DrivingCar}
          />
        </View>
      </View>
      <View style={styles.bottomSideView}>
        <Tab.Navigator
          initialRouteName={"تسجيل الدخول"}
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: config.mainColor,
              height: 4,
            },
            tabBarLabelStyle: {
              paddingBottom: "3%",
              paddingTop: "3%",
            },
            tabBarContentContainerStyle: {
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.08,
              shadowRadius: 16.0,
              elevation: 24,
            },
          }}
        >
          <Tab.Screen name="تسجيل الدخول" component={Login} />
          <Tab.Screen name="انشاء حساب" component={() => <Text>asasas</Text>} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  topSideView: {
    height: "30%",
    backgroundColor: config.mainColor,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSideView: {
    height: "70%",
    width: "100%",
    direction: "rtl",
    textAlign: "right",
  },
  safeArea: {
    width: "100%",
    height: statusBarHeight,
    backgroundColor: config.mainColor,
  },
  animationContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
