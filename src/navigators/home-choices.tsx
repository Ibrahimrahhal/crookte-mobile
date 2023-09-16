import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "home/pages/home";
import NewReport from "home/pages/new-report";
import ReportSides from "home/pages/report-sides";
import t from "home/utils/i18n";
import { Text } from "react-native-paper";

const Stack = createNativeStackNavigator();

export default function HomeChoicesNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewReport"
        component={NewReport}
        options={{
          headerTitle: () => (
            <Text
              variant="bodyLarge"
              style={{
                opacity: 0.8,
              }}
            >
              {t("newReportPageTitle")}
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="ReportSides"
        component={ReportSides}
        options={{
          headerTitle: () => (
            <Text
              variant="bodyLarge"
              style={{
                opacity: 0.8,
              }}
            >
              {t("reportSides")}
            </Text>
          ),
          headerBackTitle: t("accidentInfo"),
          headerBackTitleStyle: {
            fontSize: 10,
          },
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
