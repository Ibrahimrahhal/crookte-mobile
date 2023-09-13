import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { Text, Button, Chip } from "react-native-paper";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import config from "configs";
import { AntDesign } from "@expo/vector-icons";
import { statusBarHeight } from "home/utils/generic";
import t from "home/utils/i18n";

export default function NewReport({ navigation }: { navigation: any }) {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.backBtnWrapper}>
          <Button onPress={() => navigation.pop()}>
            <AntDesign name="close" size={22} color="white" />
          </Button>
        </View>
        <View style={styles.mainTextWrapper}>
          <Text
            variant="headlineMedium"
            style={[styles.headerText, styles.headerTextMain]}
          >
            {t("newReportPageTitle")}
          </Text>
          <View style={styles.moreInfo}>
            <Chip
              icon="map-marker"
              mode="outlined"
              onPress={() => console.log("Pressed")}
            >
              {t("locationDummyText")}
            </Chip>
            <Chip
              icon="clock-time-eight"
              mode="outlined"
              onPress={() => console.log("Pressed")}
            >
              {t("timeDateDummyText")}
            </Chip>
          </View>
        </View>
      </View>
      <View style={styles.headerRounded}></View>
      <View>
        <ScrollView style={{ flex: 1 }}></ScrollView>
      </View>
      <StatusBar backgroundColor={config.mainColor} style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: "35%",
    maxHeight: 300,
    backgroundColor: config.mainColor,
    width: "100%",
    paddingTop: statusBarHeight,
  },
  headerRounded: {
    height: 40,
    width: "100%",
    backgroundColor: "#f2f2f2",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -30,
  },
  restOfThePage: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  backBtnWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  backBtn: {
    lineHeight: 40,
  },
  mainTextWrapper: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    color: "white",
  },
  headerTextMain: {
    marginTop: 15,
    marginBottom: 15,
  },
  moreInfo: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
});
