import "react-native-gesture-handler";
import EntryNavigator from "home/navigators/entry";
import { NavigationContainer } from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  configureFonts,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Provider, useSelector } from "react-redux";
import { I18nManager } from "react-native";
import {
  useFonts,
  IBMPlexSansArabic_700Bold,
  IBMPlexSansArabic_200ExtraLight,
  IBMPlexSansArabic_400Regular,
} from "@expo-google-fonts/ibm-plex-sans-arabic";
import { store } from "home/store";
import configs from "configs";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
const fontsNames = {
  regular: {
    fontFamily: "IBMPlexSansArabic_400Regular",
    fontWeight: "normal",
  },
  bold: {
    fontFamily: "IBMPlexSansArabic_700Bold",
    fontWeight: "normal",
  },
  light: {
    fontFamily: "IBMPlexSansArabic_200ExtraLight",
    fontWeight: "normal",
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: configs.mainColor,
    secondaryContainer: configs.mainColor,
    onSecondaryContainer: "white",
    outline: "rgba(0,0,0,0.2)",
  },
  fonts: configureFonts({
    config: {
      headlineMedium: {
        fontFamily: "IBMPlexSansArabic_700Bold",
        fontWeight: "bold",
      },
      bodyLarge: {
        fontFamily: "IBMPlexSansArabic_400Regular",
        fontWeight: "normal",
      },
      titleMedium: {
        fontFamily: "IBMPlexSansArabic_400Regular",
        fontWeight: "normal",
      },
    },
  }),
};

function App() {
  const authState = useSelector((state: any) => state.auth);
  let [fontsLoaded, fontError] = useFonts({
    IBMPlexSansArabic_700Bold,
    IBMPlexSansArabic_200ExtraLight,
    IBMPlexSansArabic_400Regular,
  });
  const appReady = fontsLoaded && authState.isAuthReady;
  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) return null;
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <EntryNavigator />
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function Index() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
