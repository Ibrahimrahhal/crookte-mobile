import { View, StyleSheet } from "react-native";
import {
  Button,
  Divider,
  SegmentedButtons,
  Text,
  TextInput,
} from "react-native-paper";
import t from "home/utils/i18n";

export default function ReportSideNotes({
  moveTo,
  state,
  updateState,
  numberOfCars,
  currentActiveCar,
}: any) {
  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={styles.textWrapper}>
          <Text variant="headlineSmall" style={styles.mainText}>
            {t("accidentNotes")}
          </Text>
          <Text variant="bodyLarge" style={styles.subText}>
            {t("accidentNotesInfo")}
          </Text>
        </View>
        <Divider
          style={{
            marginVertical: 20,
          }}
        />
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              marginBottom: 20,
              fontWeight: "bold",
              opacity: 0.7,
              fontSize: 14,
            }}
          >
            {t("isUserResponsible")}
          </Text>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SegmentedButtons
              value={state.is_side_wrong}
              onValueChange={(value) => {
                updateState({
                  ...state,
                  is_side_wrong: value,
                });
              }}
              style={{
                width: "80%",
              }}
              buttons={[
                {
                  value: "false",
                  label: t("notResponsible"),
                },
                {
                  value: "true",
                  label: t("responsible"),
                },
              ]}
            />
          </View>
        </View>
        <Divider
          style={{
            marginVertical: 20,
          }}
        />
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              marginBottom: 20,
              fontWeight: "bold",
              opacity: 0.7,
              fontSize: 14,
            }}
          >
            {t("plsWriteTheDriverNotes")}
          </Text>
          <TextInput
            style={styles.textInput}
            label={t("notes")}
            mode="outlined"
            value={state.side_note}
            numberOfLines={10}
            onChangeText={(text) =>
              updateState({
                ...state,
                side_note: text,
              })
            }
          />
        </View>
        <Button
          mode="contained"
          onPress={() => {
            moveTo(4);
          }}
          disabled={false}
          style={{
            marginHorizontal: "5%",
            width: "90%",
            borderRadius: 10,
            position: "absolute",
            bottom: 20,
          }}
        >
          {currentActiveCar < numberOfCars - 1
            ? t("moveToNextCar")
            : t("finishReport")}
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    paddingHorizontal: 20,
    paddingTop: 30,
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
    maxWidth: "90%",
  },
  textInput: {
    direction: "rtl",
    height: 60,
    backgroundColor: "#f2f2f2",
  },
});
