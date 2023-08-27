import { View, StyleSheet } from "react-native";

export default function Home() {
  return <View style={styles.mainView}></View>;
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
