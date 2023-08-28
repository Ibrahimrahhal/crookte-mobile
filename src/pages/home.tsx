import { statusBarHeight } from "home/utils/generic";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import t from "home/utils/i18n";
import { Button, Divider, Text, TouchableRipple } from "react-native-paper";
import { Image } from "expo-image";
import { FontAwesome } from "@expo/vector-icons";
import configs from "configs";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState(0);
  return (
    <View style={styles.mainView}>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} />
      </View>
      <View style={styles.pageContainer}>
        <Text variant="bodyLarge">{t("welcome")}</Text>
        <Text variant="headlineMedium" style={styles.newReportTitle}>
          {t("newReport")}
        </Text>
        <View style={styles.choiceContainer}>
          <View style={styles.cardWrapper}>
            <TouchableRipple
              onPress={() => setSelected(0)}
              rippleColor="rgba(12, 82, 112, 0.1)"
              borderless={true}
              style={{
                ...styles.choiceViewWrapper,
                ...(selected === 0
                  ? styles.choiceViewWrapperSelectedWrapper
                  : {}),
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    ...styles.choiceView,
                    ...(selected === 0 ? styles.choiceViewWrapperSelected : {}),
                  }}
                >
                  <Image
                    style={styles.image}
                    source={require("../../assets/imgs/person.png")}
                    contentFit="cover"
                    transition={1000}
                    contentPosition={{ top: 0, left: "50%" }}
                  />
                </View>
                <View style={styles.iconWrapper}>
                  {selected !== 0 && (
                    <FontAwesome
                      name="circle-o"
                      size={24}
                      color="rgba(0,0,0,0.3)"
                    />
                  )}

                  {selected === 0 && (
                    <FontAwesome
                      name="check-circle"
                      size={24}
                      color={configs.mainColorDarken}
                    />
                  )}
                </View>
              </View>
            </TouchableRipple>
            <Text variant="bodyLarge" style={styles.choiceText}>
              {t("selfReport")}
            </Text>
          </View>
          <View style={styles.cardWrapper}>
            <TouchableRipple
              onPress={() => setSelected(1)}
              rippleColor="rgba(12, 82, 112, 0.1)"
              style={{
                ...styles.choiceViewWrapper,
                ...(selected === 1
                  ? styles.choiceViewWrapperSelectedWrapper
                  : {}),
              }}
              borderless={true}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    ...styles.choiceView,
                    ...(selected === 1 ? styles.choiceViewWrapperSelected : {}),
                  }}
                >
                  <Image
                    style={styles.image}
                    source={require("../../assets/imgs/police.png")}
                    contentFit="cover"
                    transition={1000}
                    contentPosition={{ top: 0, left: "50%" }}
                  />
                </View>
                <View style={styles.iconWrapper}>
                  {selected !== 1 && (
                    <FontAwesome
                      name="circle-o"
                      size={24}
                      color="rgba(0,0,0,0.3)"
                    />
                  )}

                  {selected === 1 && (
                    <FontAwesome
                      name="check-circle"
                      size={24}
                      color={configs.mainColorDarken}
                    />
                  )}
                </View>
              </View>
            </TouchableRipple>
            <Text variant="bodyLarge" style={styles.choiceText}>
              {t("requestHelp")}
            </Text>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={{
            margin: 10,
          }}
        >
          {selected === 0 ? t("newReportButton") : t("requestHelpButton")}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: statusBarHeight + 20,
  },
  mapContainer: {
    width: "100%",
    height: "30%",
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  pageContainer: {
    width: "100%",
    height: "70%",
    paddingTop: 30,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  newReportTitle: {
    marginTop: 10,
    fontSize: 36,
    lineHeight: 43,
  },
  choiceContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 30,
  },
  choiceView: {
    flex: 1,
    width: "100%",
    maxHeight: 200,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "rgba(24, 164, 224, 0.05)",
    borderWidth: 2,
    borderColor: "rgba(12, 82, 112, 0)",
  },
  iconWrapper: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  choiceViewWrapper: {
    flex: 1,
    width: "100%",
    maxHeight: 200,
    borderRadius: 25,
  },
  choiceViewWrapperSelectedWrapper: {
    shadowColor: configs.mainColorDarken,
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  choiceViewWrapperSelected: {
    borderWidth: 2,
    borderColor: "rgba(12, 82, 112, 0.5)",
  },
  cardWrapper: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 20,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  choiceText: {
    textAlign: "center",
  },
});
