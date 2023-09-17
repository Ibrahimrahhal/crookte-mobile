import { Modal, Portal, Button } from "react-native-paper";
import { Camera, CameraType } from "expo-camera";
import { FC, useEffect, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import t from "home/utils/i18n";
import * as FileSystem from "expo-file-system";
import { View } from "react-native-animatable";
import { Text } from "react-native-paper";

export default function CameraModal(props: {
  visible: boolean;
  imagesNeeded: {
    showBefore?: FC<{
      onDone: () => void;
    }>;
    showAfter?: FC<{
      onDone: () => void;
    }>;
    showDuring?: FC<any>;
  }[];
  onSubmit: (images: string[]) => void;
  onDismiss?: () => void;
}) {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const { visible, imagesNeeded, onSubmit, onDismiss } = props;
  const [isModalHiddenBeforeSubmit, setIsModalHiddenBeforeSubmit] =
    useState(false);
  const [activeImage, setActiveImage] = useState({
    order: 0,
    isBeforeActive: Boolean(imagesNeeded[0].showBefore),
    isDuringActive: !Boolean(imagesNeeded[0].showBefore),
    isAfterActive: false,
  });
  const [saveImages, setSaveImages] = useState<string[]>([]);
  const activeImageRef = imagesNeeded[activeImage.order];
  const cameraRef = useRef(null);
  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, []);
  if (!permission?.granted) {
    return <Text>{JSON.stringify(permission)}</Text>;
  }
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            padding: 40,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
          }}
          duration={300}
          animation={isModalHiddenBeforeSubmit ? "zoomOut" : "zoomIn"}
          onAnimationEnd={() => {
            if (isModalHiddenBeforeSubmit) onSubmit(saveImages);
          }}
        >
          <View
            delay={300}
            animation={"fadeIn"}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
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
              ref={cameraRef}
            >
              {activeImage.isBeforeActive && activeImageRef.showBefore && (
                <activeImageRef.showBefore
                  onDone={() => {
                    setActiveImage({
                      ...activeImage,
                      isBeforeActive: false,
                      isDuringActive: true,
                    });
                  }}
                />
              )}
              {activeImage.isDuringActive && activeImageRef.showDuring && (
                <activeImageRef.showDuring />
              )}
              {activeImage.isAfterActive && activeImageRef.showAfter && (
                <activeImageRef.showAfter
                  onDone={() => {
                    if (activeImage.order === imagesNeeded.length - 1) {
                      setIsModalHiddenBeforeSubmit(true);
                    } else {
                      setActiveImage({
                        ...activeImage,
                        order: activeImage.order + 1,
                        isBeforeActive: Boolean(
                          imagesNeeded[activeImage.order + 1].showBefore,
                        ),
                        isDuringActive: !Boolean(
                          imagesNeeded[activeImage.order + 1].showBefore,
                        ),
                        isAfterActive: false,
                      });
                    }
                  }}
                />
              )}
            </Camera>
            <Button
              mode="contained"
              onPress={async () => {
                const photo = await (
                  cameraRef.current as any
                )?.takePictureAsync();
                const content = await FileSystem.readAsStringAsync(photo.uri, {
                  encoding: FileSystem.EncodingType.Base64,
                });
                const newImages = [...saveImages];
                newImages[
                  activeImage.order
                ] = `data:image/png;base64,${content}`;
                setSaveImages(newImages);
                if (activeImageRef.showAfter) {
                  setActiveImage({
                    ...activeImage,
                    isDuringActive: false,
                    isAfterActive: true,
                  });
                } else {
                  if (activeImage.order === imagesNeeded.length - 1) {
                    setIsModalHiddenBeforeSubmit(true);
                  } else {
                    setActiveImage({
                      order: activeImage.order + 1,
                      isBeforeActive: Boolean(
                        imagesNeeded[activeImage.order + 1].showBefore,
                      ),
                      isDuringActive: !Boolean(
                        imagesNeeded[activeImage.order + 1].showBefore,
                      ),
                      isAfterActive: false,
                    });
                  }
                }
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
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
