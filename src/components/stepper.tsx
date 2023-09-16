import configs from "configs/index";
import { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function _Stepper({
  active,
  numberOfSteps,
}: {
  active: number;
  numberOfSteps: number;
}) {
  return (
    <View style={styles.container}>
      <View
        style={[
          { width: numberOfSteps < 3 ? "70%" : "100%" },
          styles.stepsWrapper,
        ]}
      >
        {Array(numberOfSteps)
          .fill(1)
          .map((_, index) => {
            return (
              <Fragment key={index}>
                <View
                  style={[styles.step, index === active && styles.stepActive]}
                >
                  <Text
                    style={[
                      styles.stepLabel,
                      index === active && styles.stepLabelActive,
                    ]}
                  >
                    {index + 1}
                  </Text>
                </View>
                {index !== numberOfSteps - 1 && (
                  <View style={styles.stepLine} />
                )}
              </Fragment>
            );
          })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
  },
  stepsWrapper: {
    margin: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  step: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderColor: "rgba(0,0,0,0.3)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  stepLabel: {
    color: "rgba(0,0,0,0.3)",
    fontSize: 12,
    fontWeight: "bold",
  },
  stepLabelActive: {
    color: "white",
  },
  stepActive: {
    backgroundColor: configs.mainColor,
    borderColor: configs.mainColor,
  },
  stepLine: {
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    marginTop: -0.5,
    height: "50%",
    flexGrow: 1,
    marginHorizontal: 20,
  },
});
