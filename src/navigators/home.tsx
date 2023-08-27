import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "home/pages/home";
import t from "home/utils/i18n";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
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
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: t("reportsTabLabel"),
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: t("notificationsTabLabel"),
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="notification" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: t("menuTabLabel"),
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="menuunfold" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
