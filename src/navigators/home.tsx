import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "home/pages/home";
import t from "home/utils/i18n";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import configs from "configs";

const Tab = createBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: configs.mainColor,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarLabel: t("homeTabLabel"),
            tabBarIcon: ({ size, color, focused }) => (
              <View style={styles.iconWrapper}>
                <View
                  style={{
                    ...styles.iconIndicator,
                    ...(focused ? styles.iconIndicatorActive : {}),
                  }}
                />
                <AntDesign name="home" size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Reports"
          component={Home}
          options={{
            headerShown: false,
            tabBarLabel: t("reportsTabLabel"),
            tabBarIcon: ({ size, color, focused }) => (
              <View style={styles.iconWrapper}>
                <View
                  style={{
                    ...styles.iconIndicator,
                    ...(focused ? styles.iconIndicatorActive : {}),
                  }}
                />
                <AntDesign name="profile" size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Home}
          options={{
            headerShown: false,
            tabBarLabel: t("notificationsTabLabel"),
            tabBarIcon: ({ size, color, focused }) => (
              <View style={styles.iconWrapper}>
                <View
                  style={{
                    ...styles.iconIndicator,
                    ...(focused ? styles.iconIndicatorActive : {}),
                  }}
                />
                <AntDesign name="notification" size={size} color={color} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Menu"
          component={Home}
          options={{
            headerShown: false,
            tabBarLabel: t("menuTabLabel"),
            tabBarIcon: ({ size, color, focused }) => (
              <View style={styles.iconWrapper}>
                <View
                  style={{
                    ...styles.iconIndicator,
                    ...(focused ? styles.iconIndicatorActive : {}),
                  }}
                />
                <AntDesign name="menuunfold" size={size} color={color} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar backgroundColor={"$fff"} style="dark" />
    </>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    flex: 1,
    flexDirection: "column",
    gap: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  iconIndicator: {
    width: 15,
    height: 5,
    borderRadius: 50,
  },
  iconIndicatorActive: {
    backgroundColor: configs.mainColor,
  },
});
