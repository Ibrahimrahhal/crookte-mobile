import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native-paper";
import HomeNavigator from "home/navigators/home";
import t from "home/utils/i18n";
import { StyleSheet } from "react-native";
import configs from "configs/index";
const Drawer = createDrawerNavigator();

export function MenuNavigator() {
  return (
    <Drawer.Navigator initialRouteName="DrawerHome">
      <Drawer.Screen
        name="DrawerHome"
        component={HomeNavigator}
        options={{
          drawerLabel: () => (
            <Text style={styles.DrawerLabel}>{t("HomeDrawerLabel")}</Text>
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  DrawerLabel: {
    fontWeight: "bold",
    color: configs.mainColor,
  },
});
