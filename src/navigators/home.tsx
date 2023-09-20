import t from "home/utils/i18n";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import configs from "configs";
import HomeChoicesNavigator from "home/navigators/home-choices";
import { useCallback } from "react";

const Tab = createBottomTabNavigator();

export default function HomeNavigator({ navigation }: any) {
  const MenuTabBtn = useCallback(
    (props: any) => (
      <TouchableOpacity {...props} onPress={() => navigation.openDrawer()} />
    ),
    [],
  );
  const HelpTabBtn = useCallback(
    (props: any) => (
      <TouchableOpacity
        {...props}
        onPress={() => navigation.navigate("AppTour")}
      />
    ),
    [],
  );

  return (
    <>
      <Tab.Navigator
        initialRouteName="ChoicesNavigator"
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
          name="Menu"
          component={HomeChoicesNavigator}
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
            tabBarButton: MenuTabBtn,
          }}
        />
        <Tab.Screen
          name="Reports"
          component={HomeChoicesNavigator}
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
          name="ChoicesNavigator"
          component={HomeChoicesNavigator}
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
          name="Notifications"
          component={HomeChoicesNavigator}
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
          name="Help"
          component={HomeChoicesNavigator}
          options={{
            headerShown: false,
            tabBarLabel: t("helpTabLabel"),
            tabBarButton: HelpTabBtn,
            tabBarIcon: ({ size, color, focused }) => (
              <View style={styles.iconWrapper}>
                <View
                  style={{
                    ...styles.iconIndicator,
                    ...(focused ? styles.iconIndicatorActive : {}),
                  }}
                />
                <AntDesign
                  name="exclamationcircleo"
                  size={size}
                  color={color}
                />
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
