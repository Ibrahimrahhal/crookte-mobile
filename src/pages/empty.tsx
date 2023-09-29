import { statusBarHeight } from "home/utils/generic";
import { StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import { Text } from "react-native-paper";
import t from "home/utils/i18n";

export default function EmptyPage() {
  return (
    <View style={styles.container} animation={"fadeIn"} delay={200}>
      <Text variant="headlineMedium" style={styles.locationIdentifiedTitle}>
        {t("noDataFound")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  locationIdentifiedTitle: {
    fontSize: 24,
    textAlign: "center",
  },
});
