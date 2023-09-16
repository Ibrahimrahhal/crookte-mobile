import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import configs from "configs/index";
import { Fragment } from "react";

export default function BreadcrumbStepper(props: {
  steps: string[];
  active: number;
}) {
  const { steps, active } = props;
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        return (
          <Fragment key={index}>
            <View style={styles.textWrapper}>
              <Text
                style={[
                  styles.labels,
                  {
                    color: index === active ? configs.mainColor : "grey",
                  },
                ]}
              >
                {step}
              </Text>
              {index === active && <View style={styles.activeLine} />}
            </View>
            {index !== steps.length - 1 && (
              <SimpleLineIcons
                name="arrow-left"
                size={16}
                color="black"
                style={{
                  opacity: 0.3,
                  paddingHorizontal: 5,
                }}
              />
            )}
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "white",
  },
  labels: {
    fontSize: 12,
    color: "grey",
    fontWeight: "bold",
  },
  activeLine: {
    width: "70%",
    height: 2,
    backgroundColor: configs.mainColor,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 50,
    marginHorizontal: "15%",
  },
  textWrapper: {
    position: "relative",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
