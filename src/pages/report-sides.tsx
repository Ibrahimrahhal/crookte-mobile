import BreadcrumbStepper from "home/components/breadcrumb-stepper";
import Card from "home/components/card";
import Stepper from "home/components/stepper";
import t from "home/utils/i18n";
import { View, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Divider, Modal, Portal, Text, Button } from "react-native-paper";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import CardFlipAnimation from "assets/animations/id-flip.json";
import { useEffect, useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import IDFrame from "assets/imgs/id-frame.svg";
const steps = [t("carInfo"), t("accidentInfo"), t("carPictures"), t("notes")];
export default function ReportSides() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [didUserSubmitFrontImage, setDidUserSubmitFrontImage] = useState(false);
  const animationRef = useRef<LottieView>(null);
  useEffect(() => {
    if (!permission?.granted) requestPermission();
    animationRef.current?.play();
  }, []);

  if (!permission?.granted) {
    return <Text>{JSON.stringify(permission)}</Text>;
  }

  return (
    <>
      <Stepper active={0} numberOfSteps={3} />
      <BreadcrumbStepper steps={steps} active={0} />
      <View style={styles.textWrapper}>
        <Text variant="headlineSmall" style={styles.mainText}>
          {t("carInfo")}
        </Text>
        <Text variant="bodyLarge" style={styles.subText}>
          {t("TakePicture")}
        </Text>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Divider
            style={{
              marginVertical: 10,
            }}
          />
          <Card
            Icon={() => <FontAwesome name="id-card" size={20} color="black" />}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTextMainTitle}>
                {t("uploadDriverID")}
              </Text>
              <Feather name="upload" size={20} color="grey" />
            </View>
          </Card>

          <Card
            Icon={() => (
              <FontAwesome name="credit-card-alt" size={20} color="black" />
            )}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTextMainTitle}>{t("uploadCarID")}</Text>
              <Feather name="upload" size={20} color="grey" />
            </View>
          </Card>
          <Divider
            style={{
              marginVertical: 20,
            }}
          />
        </View>
      </View>
      <Portal>
        <Modal
          visible={true}
          onDismiss={() => {}}
          contentContainerStyle={{
            padding: 40,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Camera
            style={{
              height: 460,
              width: "100%",
              backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              overflow: "hidden",
            }}
            type={CameraType.back}
          >
            {false && (
              <Animatable.View
                animation={{ 0: { opacity: 0 }, 1: { opacity: 1 } }}
                direction="alternate"
                iterationCount="infinite"
                duration={500}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <IDFrame
                  style={{
                    opacity: 0.9,
                  }}
                />
              </Animatable.View>
            )}
            <Animatable.View
              animation={"fadeIn"}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LottieView
                ref={animationRef}
                source={CardFlipAnimation}
                loop={true}
                autoPlay={true}
                style={{
                  height: 300,
                }}
              />
              <Text
                variant="bodyLarge"
                style={{
                  color: "white",
                  fontWeight: "900",
                  marginTop: -30,
                }}
              >
                {t("FlipTheCard")}
              </Text>
            </Animatable.View>
          </Camera>
          <Button
            mode="contained"
            onPress={() => {
              setDidUserSubmitFrontImage(true);
            }}
            style={{
              marginHorizontal: "5%",
              width: "100%",
              borderRadius: 10,
              marginTop: 20,
            }}
            icon={() => <AntDesign name="camera" size={20} color="white" />}
          >
            {t("SavePicture")}
          </Button>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  subText: {
    fontSize: 16,
    opacity: 0.8,
    fontWeight: "bold",
    marginTop: 10,
    maxWidth: "75%",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTextMainTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginTop: 20,
  },
});
