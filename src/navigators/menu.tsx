import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native-paper";
import HomeNavigator from "./home";

const Drawer = createDrawerNavigator();

export function MenuNavigator() {
  return (
    <Drawer.Navigator initialRouteName="DrawerHome">
      <Drawer.Screen
        name="DrawerHome"
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
