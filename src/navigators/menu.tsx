import { DrawerItem, createDrawerNavigator } from "@react-navigation/drawer";
import { Avatar, Divider, Text } from "react-native-paper";
import HomeNavigator from "home/navigators/home";
import t from "home/utils/i18n";
import { StyleSheet, View } from "react-native";
import configs from "configs/index";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import UserProfile from "home/pages/user-profile";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <View style={styles.profileWrapper}>
          <Avatar.Image size={60} source={require("assets/imgs/profile.png")} />
          <View style={styles.profileText}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              ابراهيم رحال
            </Text>
            <Text
              style={{
                opacity: 0.5,
                fontSize: 12,
                marginTop: 5,
              }}
            >
              09123456789
            </Text>
          </View>
        </View>
      </View>
      <Divider
        style={{
          marginVertical: 20,
          marginHorizontal: 10,
        }}
      />
      <DrawerItemList {...props} />
      <DrawerItem
        label={({ focused }) => (
          <Text
            style={{
              ...styles.DrawerLabel,
              ...(focused && styles.DrawerLabelActive),
            }}
          >
            {t("Logout")}
          </Text>
        )}
        onPress={() => console.log("Assaasas")}
      />
    </DrawerContentScrollView>
  );
}

export function MenuNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="DrawerHome"
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name="DrawerHome"
        component={HomeNavigator}
        options={{
          drawerLabel: ({ focused }) => (
            <Text
              style={{
                ...styles.DrawerLabel,
                ...(focused && styles.DrawerLabelActive),
              }}
            >
              {t("HomeDrawerLabel")}
            </Text>
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          drawerLabel: ({ focused }) => (
            <Text
              style={{
                ...styles.DrawerLabel,
                ...(focused && styles.DrawerLabelActive),
              }}
            >
              {t("UserProfileSettingsDrawerLabel")}
            </Text>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  DrawerLabel: {
    fontWeight: "400",
  },
  DrawerLabelActive: {
    fontWeight: "bold",
    color: configs.mainColor,
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor: "rgba(24, 164, 224, 0.04)",
    borderColor: "rgba(24, 164, 224, 0.1)",
    borderWidth: 1,
    borderRadius: 10,
  },
  profileText: {
    flexDirection: "column",
    marginLeft: 15,
  },
});
