import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "home/pages/home";
import NewReport from "home/pages/new-report";

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
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
