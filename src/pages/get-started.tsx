import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import config from "configs";
import t from "home/utils/i18n";
import { statusBarHeight } from "home/utils/generic";
import Svg, { Circle } from "react-native-svg";
import GetStartedDrawing from "home/sections/get-started/get-started-drawing";
import EnglishLogoDrawing from "home/sections/get-started/english-logo-drawing";
import { Text, Button } from "react-native-paper";

export default function GetStarted({ navigation }: any) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.safeArea}></View>
        <View style={styles.boxOfImage}>
          <GetStartedDrawing />
        </View>
        <View>
          <Svg height="100" width="100%" viewBox="0 0 100 100">
            <Circle cx="50" cy="-300" r="120%" fill={config.mainColor} />
          </Svg>
        </View>
        <View style={styles.buttomWordContainer}>
          <EnglishLogoDrawing />
          <Text variant="titleMedium" style={styles.arabText}>
            {t("getStarted")}
          </Text>
          <Button
            mode="contained"
            onPress={() => console.log("Pressed")}
            style={styles.buttonStyle}
          >
            {t("getStartedButton")}
          </Button>
        </View>
      </View>
      <StatusBar backgroundColor={config.mainColor} style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  boxOfImage: {
    height: "42%",
    backgroundColor: config.mainColor,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    width: "100%",
    height: statusBarHeight,
    backgroundColor: config.mainColor,
  },
  buttomWordContainer: {
    alignItems: "center",
    paddingTop: "5%",
  },
  arabText: {
    textAlign: "center",
    marginTop: "5%",
  },
  buttonStyle: {
    marginTop: "5%",
  },
});
