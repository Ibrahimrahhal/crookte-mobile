import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { Text, Button, Chip } from "react-native-paper";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import config from "configs";
import { AntDesign } from "@expo/vector-icons";
import { statusBarHeight } from "home/utils/generic";
import t from "home/utils/i18n";
import * as Animatable from "react-native-animatable";
import * as Location from "expo-location";
import CarCrash from "assets/imgs/car-crash.svg";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import Counter from "home/components/counter";
import { useCallback, useEffect, useState } from "react";
import Card from "home/components/card";
import { useSelector } from "react-redux";
import { AuthState } from "home/store/slices/auth";
import MapUtil from "home/utils/maps";

function formatDateTimeInArabic(date: Date) {
  const weekdays = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  const day = weekdays[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours < 12 ? "صباحًا" : "مساءً";

  const arabicHours = String(hours % 12 || 12);
  const arabicMinutes = String(minutes).padStart(2, "0");

  return `${day} ${arabicHours}:${arabicMinutes} ${period}`;
}

function formatDateAsString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

export default function NewReport({ navigation }: { navigation: any }) {
  const [numberOfCarsInvolved, setNumberOfCarsInvolved] = useState(1);
  const userData = useSelector((state: { auth: AuthState }) => state.auth.user);
  const [errorMsg, setErrorMsg] = useState("");
  const [location, setLocation] = useState<any>(null);
  const [locationStr, setLocationStr] = useState("");
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleGetLocation = useCallback(async () => {
    const results = await MapUtil.getStringAddressFromLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLocationStr(results);
  }, [location]);

  useEffect(() => {
    if (location) {
      handleGetLocation();
    }
  }, [location]);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.backBtnWrapper}>
          {/* <Button onPress={() => navigation.pop()}>
            <AntDesign name="close" size={22} color={config.mainColor} />
          </Button> */}
        </View>
        <View style={styles.textWrapper}>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
            }}
          >
            <Animatable.View animation={"fadeInRight"}>
              <Text style={styles.pageTitle} variant="headlineMedium">
                {t("newReportPageTitle")}
              </Text>
            </Animatable.View>
            <Animatable.View animation={"fadeInRight"} delay={300}>
              <Text variant="headlineMedium" style={styles.pageDescription}>
                {t("newReportPageDescription")}
              </Text>
            </Animatable.View>
          </View>
          <View style={styles.cards}>
            <Animatable.View animation={"fadeInUp"} delay={500}>
              <Card
                Icon={() => <FontAwesome name="user" size={24} color="black" />}
                style={{
                  marginTop: 0,
                }}
              >
                <Text style={styles.locationTextMain}>
                  {userData?.firstName} {userData?.lastName}
                </Text>
                <Text style={styles.locationTextSecondary}>
                  {t("userReporter")}
                </Text>
              </Card>
            </Animatable.View>
            <Animatable.View animation={"fadeInUp"} delay={600}>
              <Card
                Icon={() => (
                  <AntDesign name="enviroment" size={24} color="black" />
                )}
              >
                <Text style={styles.locationTextMain}>
                  {locationStr || t("locationFindingInProgress")}
                </Text>
                <Text style={styles.locationTextSecondary}>
                  {t("locationDummyTextSecondary")}
                </Text>
              </Card>
            </Animatable.View>
            <Animatable.View animation={"fadeInUp"} delay={700}>
              <Card
                Icon={() => (
                  <AntDesign name="clockcircle" size={24} color="black" />
                )}
              >
                <Text style={styles.locationTextMain}>
                  {formatDateTimeInArabic(new Date())}
                </Text>
                <Text style={styles.locationTextSecondary}>
                  {formatDateAsString(new Date())}
                </Text>
              </Card>
            </Animatable.View>
            <Animatable.View animation={"fadeInUp"} delay={800}>
              <Card
                Icon={() => (
                  <FontAwesome5 name="car-crash" size={24} color="black" />
                )}
              >
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
              </Card>
            </Animatable.View>
          </View>
        </View>
      </View>

      <Animatable.View
        animation={"fadeIn"}
        delay={1000}
        style={{
          flex: 1,
        }}
      >
        <Button
          mode="contained"
          onPress={() => {
            navigation.push("ReportSides", {
              cars: numberOfCarsInvolved,
            });
          }}
          style={{
            marginHorizontal: "5%",
            width: "90%",
            borderRadius: 10,
            position: "absolute",
            bottom: 20,
          }}
        >
          {t("continueTheReport")}
        </Button>
      </Animatable.View>
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
  textWrapper: {
    justifyContent: "center",
    alignItems: "center",
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
  },
  counterWrapper: {
    paddingTop: 20,
    flexDirection: "row-reverse",
  },
  pageTitle: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 43,
  },
  pageDescription: {
    fontSize: 14,
    color: "rgba(0,0,0,0.5)",
    lineHeight: 21,
    marginBottom: 50,
  },
});
