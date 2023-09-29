import { Image } from "expo-image";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Entypo } from "@expo/vector-icons";
import configs from "configs";

const getPointDim = () => {
  return Dimensions.get("window").width * 0.09;
};
type Point = {
  x: number;
  y: number;
  ID: string;
};
export default function CarPointSelect(props: {
  selectedPoints: Point[];
  setSelectedPoints: (points: Point[]) => void;
}) {
  const { selectedPoints, setSelectedPoints } = props;
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={(event) => {
        let x = event.nativeEvent.locationX;
        let y = event.nativeEvent.locationY;
        let cancel: any = selectedPoints.find((point: any) => {
          return (
            x - getPointDim() < (true ? point.locationX : point.locationY) &&
            (true ? point.locationX : point.locationY) < x + getPointDim() &&
            y - getPointDim() < (false ? point.locationX : point.locationY) &&
            (false ? point.locationX : point.locationY) < y + getPointDim()
          );
        });
        cancel = cancel || (x < 50 && y < 50);
        if (cancel) {
          return;
        }
        setSelectedPoints([
          ...selectedPoints,
          {
            x,
            y,
            ID: Date.now().toString(),
          },
        ]);
      }}
    >
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Image
          source={require("assets/imgs/carTopView.png")}
          style={{
            height: Dimensions.get("window").height * 0.35,
            width: Dimensions.get("window").width,
          }}
          contentFit="contain"
        />
        <View style={styles.pointsContainer}>
          {selectedPoints.map((point) => {
            return (
              <Animatable.View
                animation={"bounceIn"}
                key={point.ID}
                style={[
                  styles.point,
                  {
                    top: point.y - getPointDim() / 2 || 0,
                    right: point.x - getPointDim() / 2 || 0,
                  },
                ]}
              >
                <TouchableOpacity
                  onLongPress={() => {
                    setSelectedPoints(
                      selectedPoints.filter((p) => p.ID !== point.ID),
                    );
                  }}
                  style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Entypo name="cross" size={18} color="white" />
                </TouchableOpacity>
              </Animatable.View>
            );
          })}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  pointsContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  point: {
    height: getPointDim(),
    width: getPointDim(),
    backgroundColor: configs.mainColor,
    opacity: 0.8,
    position: "absolute",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
