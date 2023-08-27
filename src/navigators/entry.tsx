import { createStackNavigator } from "@react-navigation/stack";
import GetStarted from "home/pages/get-started";
import Auth from "home/pages/auth";
import HomeNavigator from "home/navigators/home";

const Stack = createStackNavigator();

export default function EntryNavigator() {
  return (
    <Stack.Navigator initialRouteName={"HomeNavigator"}>
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
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
