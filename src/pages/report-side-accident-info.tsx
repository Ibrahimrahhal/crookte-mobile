import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Divider, SegmentedButtons, Text } from "react-native-paper";
import t from "home/utils/i18n";
import CarPointSelect from "home/components/car-point-select";

export default function ReportSideAccidentInfo({ moveTo }: any) {
  const [value, setValue] = useState("no");
  const [selectedPoints, setSelectedPoints] = useState<any>([]);
  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 30,
          }}
        >
          <Text variant="headlineSmall" style={styles.mainText}>
            {t("carDamages")}
          </Text>
          <Text variant="bodyLarge" style={styles.subText}>
            {t("pleaseSelectThePlaceOfDamage")}
          </Text>
          <CarPointSelect
            selectedPoints={selectedPoints}
            setSelectedPoints={setSelectedPoints}
          />
        </View>
        <Button
          mode="contained"
          onPress={() => {
            moveTo(2);
          }}
          disabled={selectedPoints.length === 0}
          style={{
            marginHorizontal: "5%",
            width: "90%",
            borderRadius: 10,
            position: "absolute",
            bottom: 20,
          }}
        >
          {t("moveToCarPictures")}
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
