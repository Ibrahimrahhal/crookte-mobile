import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { Button, Text } from "react-native-paper";
import SpinningCar from "assets/animations/car-spining.json";
import t from "home/utils/i18n";
import { useRef, useState } from "react";
import LottieAnimatedProgress from "home/components/lottie-animated-progress";
import CameraModal from "home/components/camera-modal";
import * as Animatable from "react-native-animatable";
import CheckAnimation from "assets/animations/check.json";

const sides: {
  [key: string]: number;
} = {
  right: 0.74,
  left: 0.25,
  front: 1,
  back: 0.5,
};

const sidesOrder = ["right", "left", "front", "back"];
const sidesText = {
  right: t("rightSide"),
  left: t("leftSide"),
  front: t("frontSide"),
  back: t("backSide"),
};
export default function ReportSideCarPictures({
  moveTo,
  state,
  updateState,
}: any) {
  const [picturesHasStarted, setPicturesHasStarted] = useState(false);
  const [picturesHasEnded, setPicturesHasEnded] = useState(false);

  const [activeSide, setActiveSide] = useState<string>("right");
  const [savedImages, setSavedImages] = useState<{
    [key: string]: string;
  }>({});
  const animationRef = useRef<LottieView>(null);
  const [openCameraModal, setOpenCameraModal] = useState(false);
  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={styles.textWrapper}>
          <Text variant="headlineSmall" style={styles.mainText}>
            {picturesHasStarted
              ? picturesHasEnded
                ? t("takingPictureIsDone")
                : (sidesText as any)[activeSide]
              : t("carPictures")}
          </Text>
          <Text variant="bodyLarge" style={styles.subText}>
            {picturesHasStarted ? t("carPicturesInfo") : t("takePcitureInfo")}
          </Text>
        </View>
        {!picturesHasEnded && (
          <LottieAnimatedProgress
            style={styles.spinningCar}
            autoPlay={!picturesHasStarted}
            source={SpinningCar}
            progress={picturesHasStarted ? sides[activeSide] : undefined}
            loop={!picturesHasStarted}
            speed={picturesHasStarted ? 3 : 1}
          />
        )}

        {picturesHasEnded && (
          <Animatable.View
            animation={"fadeIn"}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: Dimensions.get("window").height * 0.15,
            }}
            onAnimationEnd={() => {
              animationRef.current?.play();
            }}
          >
            <LottieView
              ref={animationRef}
              source={CheckAnimation}
              autoPlay={false}
              loop={false}
              style={{
                height: 300,
              }}
            />
          </Animatable.View>
        )}
        <Button
          mode="contained"
          onPress={() => {
            if (!picturesHasStarted) {
              setPicturesHasStarted(true);
            } else if (picturesHasEnded) {
              moveTo(3);
            } else {
              setOpenCameraModal(true);
            }
          }}
          disabled={false}
          style={{
            marginHorizontal: "5%",
            width: "90%",
            borderRadius: 10,
            position: "absolute",
            bottom: 20,
          }}
        >
          {picturesHasStarted
            ? picturesHasEnded
              ? t("moveToAccidentNotes")
              : t("takePictureForThisSide")
            : t("startTakingPictures")}
        </Button>
      </View>
      {openCameraModal && (
        <CameraModal
          visible={true}
          onDismiss={() => {
            setOpenCameraModal(false);
          }}
          onSubmit={(images: string[]) => {
            setOpenCameraModal(false);
            setSavedImages({
              ...savedImages,
              [activeSide]: images[0],
            });
            if (activeSide === "back") {
              setPicturesHasEnded(true);
              return;
            }
            setActiveSide(sidesOrder[sidesOrder.indexOf(activeSide) + 1]);
          }}
          imagesNeeded={[{}]}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  spinningCar: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    transform: [{ scale: 0.85 }],
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
    maxWidth: "90%",
  },
});
