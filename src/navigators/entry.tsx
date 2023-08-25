import { createStackNavigator } from "@react-navigation/stack";
import GetStarted from "home/pages/get-started";

const Stack = createStackNavigator();

export default function EntryNavigator() {
  return (
    <Stack.Navigator initialRouteName={"GetStarted"}>
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
