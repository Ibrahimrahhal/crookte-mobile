import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { Text, Button, Chip, Card } from "react-native-paper";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import config from "configs";
import { AntDesign } from "@expo/vector-icons";
import { statusBarHeight } from "home/utils/generic";
import t from "home/utils/i18n";
import CarCrash from "assets/imgs/car-crash.svg";
import { FontAwesome5 } from "@expo/vector-icons";
import Counter from "home/components/counter";
import { useState } from "react";

export default function NewReport({ navigation }: { navigation: any }) {
  const [numberOfCarsInvolved, setNumberOfCarsInvolved] = useState(1);
  return (
    <>
      <View style={styles.header}>
        <View style={styles.backBtnWrapper}>
          {/* <Button onPress={() => navigation.pop()}>
            <AntDesign name="close" size={22} color={config.mainColor} />
          </Button> */}
        </View>
        <View style={styles.textWrapper}>
          <View style={styles.carImageWrapper}>
            <CarCrash />
          </View>
          <View style={styles.cards}>
            <Card
              mode="outlined"
              style={{
                backgroundColor: "#fafafa",
                borderColor: "rgba(0,0,0,0.1)",
              }}
            >
              <Card.Content>
                <View style={styles.cardItem}>
                  <View style={styles.iconWrapper}>
                    <AntDesign name="enviroment" size={24} color="black" />
                  </View>
                  <View style={styles.cardItemText}>
                    <Text style={styles.locationTextMain}>
                      {t("locationDummyText")}
                    </Text>
                    <Text style={styles.locationTextSecondary}>
                      {t("locationDummyTextSecondary")}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
            <Card
              mode="outlined"
              style={{
                backgroundColor: "#fafafa",
                borderColor: "rgba(0,0,0,0.1)",
                marginTop: 10,
              }}
            >
              <Card.Content>
                <View style={styles.cardItem}>
                  <View style={styles.iconWrapper}>
                    <AntDesign name="clockcircle" size={24} color="black" />
                  </View>
                  <View style={styles.cardItemText}>
                    <Text style={styles.locationTextMain}>
                      {t("timeDateDummyText")}
                    </Text>
                    <Text style={styles.locationTextSecondary}>
                      {t("timeDateDummyTextSecondary")}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
            <Card
              mode="outlined"
              style={{
                backgroundColor: "#fafafa",
                borderColor: "rgba(0,0,0,0.1)",
                marginTop: 10,
              }}
            >
              <Card.Content>
                <View style={styles.cardItem}>
                  <View style={styles.iconWrapper}>
                    <FontAwesome5 name="car-crash" size={24} color="black" />
                  </View>
                  <View style={styles.cardItemText}>
                    <Text style={styles.locationTextMain}>
                      {t("carInvolvedCount")}
                    </Text>
                    <Text style={styles.locationTextSecondary}>
                      {t("countShouldBeMoreThanZero")}
                    </Text>
                    <View style={styles.counterWrapper}>
                      <Counter
                        value={numberOfCarsInvolved}
                        onChange={(newVal) => {
                          if (newVal < 1) return;
                          setNumberOfCarsInvolved(newVal);
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
        </View>
      </View>
      <View>
        <ScrollView style={{ flex: 1 }}></ScrollView>
      </View>
      <StatusBar style="dark" />
    </>
  );
}

const styles = StyleSheet.create({
  header: {},

  backBtnWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  carImageWrapper: {
    width: Dimensions.get("window").width * 0.7,
    maxHeight: Dimensions.get("window").height * 0.4,
    marginTop: -30,
  },
  textWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  cardItemText: {
    flexGrow: 1,
  },
  locationTextMain: {
    fontSize: 14,
    fontWeight: "bold",
  },
  locationTextSecondary: {
    fontSize: 10,
    color: "rgba(0,0,0,0.5)",
    marginTop: 2,
  },
  cards: {
    width: "90%",
    marginTop: -20,
  },
  counterWrapper: {
    paddingTop: 20,
    flexDirection: "row-reverse",
  },
});