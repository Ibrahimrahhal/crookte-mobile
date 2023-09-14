import { Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Counter({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.counterBtn}
        onPress={() => onChange(value + 1)}
      >
        <Text>+</Text>
      </TouchableOpacity>
      <View style={styles.counterWrapper}>
        <Text>{value}</Text>
      </View>
      <TouchableOpacity
        style={styles.counterBtn}
        onPress={() => onChange(value - 1)}
      >
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 120,
    borderColor: "rgba(0,0,0,0.1)",
    borderWidth: 1,
    borderRadius: 7,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  counterBtn: {
    width: 35,
    height: 30,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  counterWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
});
