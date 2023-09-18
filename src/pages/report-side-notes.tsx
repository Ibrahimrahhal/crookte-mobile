import { View } from "react-native";
import { Divider, SegmentedButtons, Text } from "react-native-paper";
import t from "home/utils/i18n";
import { useState } from "react";

export default function ReportSideNotes() {
  const [value, setValue] = useState("no");
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
          }}
        >
          <Text
            style={{
              marginTop: 30,
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
              value={value}
              onValueChange={setValue}
              style={{
                width: "80%",
              }}
              buttons={[
                {
                  value: "no",
                  label: t("notResponsible"),
                },
                {
                  value: "yes",
                  label: t("responsible"),
                },
              ]}
            />
          </View>
          <Divider
            style={{
              marginVertical: 30,
            }}
          />
        </View>
      </View>
    </>
  );
}
