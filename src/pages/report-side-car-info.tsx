import { FontAwesome, Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import CardFlipAnimation from "assets/animations/id-flip.json";
import CheckAnimation from "assets/animations/check.json";
import { Button, Divider, Text } from "react-native-paper";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Card from "home/components/card";
import t from "home/utils/i18n";
import * as Animatable from "react-native-animatable";
import IDFrame from "assets/imgs/id-frame.svg";
import CameraModal from "home/components/camera-modal";
import { useEffect, useRef, useState } from "react";
import configs from "configs";

const FlipCardAnimationComponent = () => {
  return (
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
  );
};
const CheckIcon = () => (
  <View style={styles.checkIconWrapper}>
    <FontAwesome name="check-circle" size={24} color={"white"} />
  </View>
);
export default function ReportSideCarInfo(props: {
  moveTo: (index: number) => void;
}) {
  const [openDriverIDModal, setOpenDriverIDModal] = useState(false);
  const [openCarIDModal, setOpenCarIDModal] = useState(false);
  const [driverIDImage, setDriverIDImage] = useState<null | String[]>(null);
  const [carIDImage, setCarIDImage] = useState<null | String[]>(null);

  return (
    <>
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
          <TouchableOpacity
            onPress={() => {
              if (!driverIDImage) setOpenDriverIDModal(true);
            }}
          >
            <Card
              Icon={() => {
                return (
                  <>
                    {driverIDImage ? (
                      <CheckIcon />
                    ) : (
                      <FontAwesome name="id-card" size={20} color="black" />
                    )}
                  </>
                );
              }}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardTextMainTitle}>
                  {t("uploadDriverID")}
                </Text>
                <Animatable.View
                  animation={driverIDImage ? "fadeOut" : "fadeIn"}
                >
                  <Feather name="upload" size={20} color="grey" />
                </Animatable.View>
              </View>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!carIDImage) setOpenCarIDModal(true);
            }}
          >
            <Card
              Icon={() => {
                return (
                  <>
                    {carIDImage ? (
                      <CheckIcon />
                    ) : (
                      <FontAwesome
                        name="credit-card-alt"
                        size={20}
                        color="black"
                      />
                    )}
                  </>
                );
              }}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardTextMainTitle}>{t("uploadCarID")}</Text>
                <Animatable.View animation={carIDImage ? "fadeOut" : "fadeIn"}>
                  <Feather name="upload" size={20} color="grey" />
                </Animatable.View>
              </View>
            </Card>
          </TouchableOpacity>
          <Divider
            style={{
              marginVertical: 20,
            }}
          />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
        }}
      >
        <Button
          mode="contained"
          onPress={() => {
            props.moveTo(1);
          }}
          disabled={!driverIDImage || !carIDImage}
          style={{
            marginHorizontal: "5%",
            width: "90%",
            borderRadius: 10,
            position: "absolute",
            bottom: 20,
          }}
        >
          {t("moveToAccidentInfo")}
        </Button>
      </View>
      {(openDriverIDModal || openCarIDModal) && (
        <CameraModal
          visible={true}
          onDismiss={() => {
            setOpenCarIDModal(false);
            setOpenDriverIDModal(false);
          }}
          onSubmit={(images: string[]) => {
            if (openDriverIDModal) {
              setOpenDriverIDModal(false);
              setDriverIDImage(images);
            } else {
              setOpenCarIDModal(false);
              setCarIDImage(images);
            }
          }}
          imagesNeeded={[
            {
              showDuring: FlipCardAnimationComponent,
              showAfter: ({ onDone }: any) => {
                const [isTransitioning, setIsTransitioning] = useState(false);
                const animationRef = useRef<LottieView>(null);
                return (
                  <Animatable.View
                    animation={isTransitioning ? "fadeOut" : "fadeIn"}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(255,255,255,0.8)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onAnimationEnd={() => {
                      if (isTransitioning) {
                        onDone();
                      } else {
                        animationRef.current?.play();
                        setTimeout(() => {
                          setIsTransitioning(true);
                        }, 1000);
                      }
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
                );
              },
            },
            {
              showBefore: ({ onDone }: any) => {
                const [isTransitioning, setIsTransitioning] = useState(false);
                const animationRef = useRef<LottieView>(null);
                useEffect(() => {
                  animationRef.current?.play();
                }, []);
                return (
                  <Animatable.View
                    animation={isTransitioning ? "fadeOut" : "fadeIn"}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0,0,0,0.8)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onAnimationEnd={() => {
                      if (isTransitioning) onDone();
                      else
                        setTimeout(() => {
                          setIsTransitioning(true);
                        }, 4000);
                    }}
                  >
                    <LottieView
                      ref={animationRef}
                      source={CardFlipAnimation}
                      autoPlay={true}
                      loop={true}
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
                );
              },
              showDuring: FlipCardAnimationComponent,
            },
          ]}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  checkIconWrapper: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: configs.mainColor,
    justifyContent: "center",
    alignItems: "center",
  },
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
