import { createStackNavigator } from "@react-navigation/stack";
import GetStarted from "home/pages/get-started";
import Auth from "home/pages/auth";
import HomeNavigator from "home/navigators/home";
import { MenuNavigator } from "./menu";
import AppTour from "home/pages/app-tour";

const Stack = createStackNavigator();

export default function EntryNavigator() {
  return (
    <Stack.Navigator initialRouteName={"AppTour"}>
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Authentication"
        component={Auth}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeNavigator"
        component={MenuNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AppTour"
        component={AppTour}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
