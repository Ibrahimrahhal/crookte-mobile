import * as Animatable from "react-native-animatable";
import { statusBarHeight } from "home/utils/generic";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import MapView, { Marker } from "react-native-maps";
import t from "home/utils/i18n";
import LottieView from "lottie-react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  Text,
  TouchableRipple,
  Switch,
  Portal,
  Modal,
} from "react-native-paper";
import { Image } from "expo-image";
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import configs from "configs";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import * as Location from "expo-location";
import useColorAnimation from "home/hooks/useColorAnimation";
import mapStyle from "assets/map-styles/default.json";
import PoliceBike from "assets/animations/police-bike.json";

const RequestedHelpModal = ({
  visible,
  closed,
  style,
}: {
  visible: boolean;
  closed: () => void;
  style?: any;
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={closed}
        contentContainerStyle={styles.modalStyles}
        style={styles.modalWrapperStyles}
      >
        <Animatable.View
          animation={"zoomIn"}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          duration={500}
        >
          <LottieView
            style={styles.policeBikeAnimationWrapper}
            autoPlay={true}
            source={PoliceBike}
          />
          <Text variant="headlineMedium" style={styles.policeInTheWayTextTitle}>
            {t("wereInTheWay")}
          </Text>
          <Text style={styles.policeInTheWayTextDesc}>
            {t("wereInTheWayInfo")}
          </Text>
          <Button
            onPress={() => {}}
            mode="contained"
            style={styles.policeInTheWayButton}
          >
            {t("close")}
          </Button>
        </Animatable.View>
      </Modal>
    </Portal>
  );
};
export default function Home({ navigation }: any) {
  const [selected, setSelected] = useState(0);
  const [location, setLocation] = useState<any>(null);
  const [hasSelected, setHasSelected] = useState(false);
  const [showRequestHelp, setShowRequestHelp] = useState(false);
  const [locationStr, setLocationStr] = useState<any>(null);
  const [hideLocationLoader, setHideLocationLoader] = useState<any>(false);
  const [isRequestHelpLoading, setIsRequestHelpLoading] = useState<any>(false);
  const [isRequestHelpDone, setIsRequestHelpDone] = useState<any>(false);

  const hasSelectedNewReport = selected === 0 && hasSelected;
  const hasSelectedRequestHelp = selected === 1 && hasSelected;
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [backgroundColor, finished] = useColorAnimation(
    selected === 0 ? configs.mainColor : configs.mainColorDarken,
  );
  const hasSentRequestHelp = true;
  const [isAmbulanceSelected, setIsAmbulanceSelected] = useState(false);
  const [isFireCardSelected, _setIsFireCardSelected] = useState(false);
  const setIsFireCardSelected = ({ val }: { val: boolean }) => {
    if (val) setIsAmbulanceSelected(true);
    _setIsFireCardSelected(val);
  };

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
  const handleGetLocation = useCallback(() => {
    setTimeout(() => {
      setLocationStr("شارع الجامعة الاردنية، عمان، الأردن");
    }, 5000);
  }, []);

  return (
    <View style={styles.mainView}>
      <RequestedHelpModal visible={isRequestHelpDone} closed={() => {}} />
      <Animatable.View
        style={styles.mapContainer}
        onAnimationEnd={() => {
          if (!hasSelectedRequestHelp) return;
          setShowRequestHelp(true);
        }}
        animation={
          hasSelectedRequestHelp
            ? hideLocationLoader
              ? {
                  from: {
                    height: "75%",
                  },
                  to: {
                    height: "40%",
                  },
                }
              : {
                  from: {
                    height: "30%",
                  },
                  to: {
                    height: "75%",
                  },
                }
            : undefined
        }
      >
        <MapView
          style={styles.map}
          zoomEnabled={false}
          provider="google"
          customMapStyle={mapStyle}
          region={{
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          camera={
            hasSelectedRequestHelp
              ? {
                  center: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  },
                  pitch: 0,
                  heading: 0,
                  altitude: 1000,
                  zoom: 17,
                }
              : undefined
          }
        >
          {hasSelectedRequestHelp && (
            <Marker
              coordinate={{
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
              }}
              title={t("youAreHere")}
            />
          )}
        </MapView>
      </Animatable.View>
      {hideLocationLoader && (
        <Animatable.View style={styles.locationIdentifiedContainer}>
          <Animatable.View animation={"fadeInRight"} delay={400}>
            <Text
              variant="headlineMedium"
              style={styles.locationIdentifiedTitle}
            >
              {t("locationIdentified")}
            </Text>
          </Animatable.View>
          <Animatable.View animation={"fadeInRight"} delay={600}>
            <Text variant="bodyLarge">{locationStr}</Text>
          </Animatable.View>
          <Divider style={styles.locationIdentifiedDivider} />
          <Animatable.View animation={"fadeIn"} delay={1000}>
            <Text variant="bodyMedium" style={styles.additionalInfoFillTitle}>
              {t("fillToCompleteReport")}
            </Text>
            <View style={styles.additionalInfoContainer}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setIsAmbulanceSelected(!isAmbulanceSelected);
                }}
              >
                <View style={styles.additionalInfoCard}>
                  <View style={styles.additionalInfoContent}>
                    <Text variant="bodyLarge">{t("includeAnAmbulance")}</Text>
                  </View>
                  <Text>
                    <Switch
                      value={isAmbulanceSelected}
                      disabled={isFireCardSelected}
                      onValueChange={() =>
                        setIsAmbulanceSelected(!isAmbulanceSelected)
                      }
                    />
                    ;
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  setIsFireCardSelected({ val: !isFireCardSelected });
                }}
              >
                <View style={styles.additionalInfoCard}>
                  <View style={styles.additionalInfoContent}>
                    <Text variant="bodyLarge">{t("includeAnFireCar")}</Text>
                  </View>
                  <Text>
                    <Switch
                      value={isFireCardSelected}
                      onValueChange={() =>
                        setIsFireCardSelected({ val: !isFireCardSelected })
                      }
                    />
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <Animatable.View
                animation={isRequestHelpDone && "fadeOut"}
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  margin: 25,
                  flexGrow: 1,
                  flexShrink: 0,
                }}
              >
                <Button
                  mode="contained"
                  onPress={() => {
                    setIsRequestHelpLoading(true);
                    setTimeout(() => {
                      setIsRequestHelpLoading(false);
                      setIsRequestHelpDone(true);
                    }, 3000);
                  }}
                  style={{}}
                  loading={isRequestHelpLoading}
                  disabled={isRequestHelpLoading}
                >
                  {isRequestHelpLoading
                    ? t("requestHelpButton")
                    : t("requestHelpButtonLoading")}
                </Button>
              </Animatable.View>
            </View>
          </Animatable.View>
        </Animatable.View>
      )}
      {showRequestHelp && !hideLocationLoader && (
        <Animatable.View
          animation={Boolean(locationStr) ? "fadeOut" : "fadeIn"}
          onAnimationEnd={() => {
            if (!locationStr) return;
            setHideLocationLoader(true);
          }}
          style={styles.locationFindingContainer}
        >
          <ActivityIndicator
            animating={true}
            size={"large"}
            color={configs.mainColor}
          />
          <Text variant="bodyLarge" style={styles.locationFindingText}>
            {t("findingYourLocation")}
          </Text>
        </Animatable.View>
      )}
      <Animatable.View
        style={styles.pageContainer}
        animation={!hasSelectedRequestHelp ? "fadeInUp" : "fadeOutDown"}
      >
        <Text variant="bodyLarge">{t("welcome")}</Text>
        <Text variant="headlineMedium" style={styles.newReportTitle}>
          {t("newReport")}
        </Text>
        <Animatable.View style={styles.choiceContainer}>
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
        </Animatable.View>
        <Button
          mode="contained"
          onPress={() => {
            setHasSelected(true);
            if (selected === 0) navigation.navigate("NewReport");
            else handleGetLocation();
          }}
          style={{
            margin: 10,
            backgroundColor: backgroundColor as any,
          }}
        >
          {selected === 0 ? t("newReportButton") : t("requestHelpButton")}
        </Button>
      </Animatable.View>
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
  locationIdentifiedContainer: {
    marginTop: 30,
  },
  locationIdentifiedDivider: {
    marginTop: 30,
    marginBottom: 30,
  },
  locationIdentifiedTitle: {
    fontSize: 24,
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
  locationFindingContainer: {
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  locationFindingText: {
    textAlign: "center",
    opacity: 0.5,
    marginTop: 10,
  },
  modalStyles: {
    width: "90%",
    height: "80%",
  },
  modalWrapperStyles: {
    justifyContent: "center",
    alignItems: "center",
  },
  policeBikeAnimationWrapper: {
    height: "auto",
    width: "100%",
    alignItems: "center",
  },
  policeInTheWayTextTitle: {
    marginTop: -40,
  },
  policeInTheWayTextDesc: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  policeInTheWayButton: {
    width: "90%",
    marginBottom: 10,
  },
  additionalInfoFillTitle: {
    opacity: 0.5,
  },
  additionalInfoContainer: {
    marginTop: 20,
  },
  additionalInfoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
    backgroundColor: "rgba(24, 164, 224, 0.05)",
  },
  additionalInfoContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});
