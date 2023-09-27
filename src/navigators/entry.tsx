import { createStackNavigator } from "@react-navigation/stack";
import GetStarted from "home/pages/get-started";
import Auth from "home/pages/auth";
import HomeNavigator from "home/navigators/home";
import { MenuNavigator } from "./menu";
import AppTour from "home/pages/app-tour";
import { useSelector } from "react-redux";
import ProtectedHOC from "home/components/protected.page";

const Stack = createStackNavigator();
const ProtectedMenuNavigator = ProtectedHOC(MenuNavigator);
export default function EntryNavigator() {
  const isUserFirstTime = useSelector(
    (state: any) => state.auth.isUserFirstTime,
  );
  const isUserLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  return (
    <Stack.Navigator
      initialRouteName={
        isUserFirstTime
          ? "GetStarted"
          : isUserLoggedIn
          ? "HomeNavigator"
          : "Authentication"
      }
    >
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
        component={ProtectedMenuNavigator}
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
