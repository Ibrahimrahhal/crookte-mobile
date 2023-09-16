import BreadcrumbStepper from "home/components/breadcrumb-stepper";
import Stepper from "home/components/stepper";
import t from "home/utils/i18n";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
const steps = [t("carInfo"), t("accidentInfo"), t("carPictures"), t("notes")];
export default function ReportSides() {
  return (
    <>
      <Stepper active={0} numberOfSteps={2} />
      <BreadcrumbStepper steps={steps} active={0} />
      <View style={styles.textWrapper}>
        <Text variant="headlineSmall" style={styles.mainText}>
          {t("carInfo")}
        </Text>
        <Text variant="bodyLarge" style={styles.subText}>
          {t("TakePicture")}
        </Text>
      </View>
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
});
