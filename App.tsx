import 'react-native-gesture-handler';
import EntryNavigator from 'home/navigators/entry';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme,  PaperProvider } from 'react-native-paper';
import { View, StyleSheet, Platform } from 'react-native';
import configs from 'configs';
import { I18nManager } from "react-native";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: configs.mainColor,
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>
    <View style={styles.container}>

      <EntryNavigator />
      </View>
    </NavigationContainer>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});