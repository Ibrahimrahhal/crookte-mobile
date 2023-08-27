import 'react-native-gesture-handler';
import EntryNavigator from 'home/navigators/entry';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme,  PaperProvider, configureFonts } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import configs from 'configs';
import { I18nManager } from "react-native";
import { useFonts, IBMPlexSansArabic_700Bold, IBMPlexSansArabic_200ExtraLight, IBMPlexSansArabic_400Regular } from '@expo-google-fonts/ibm-plex-sans-arabic';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
const fontsNames  = {
  regular: {
    fontFamily: 'IBMPlexSansArabic_400Regular',
    fontWeight: 'normal',
  },
  bold: {
    fontFamily: 'IBMPlexSansArabic_700Bold',
    fontWeight: 'normal',
  },
  light: {
    fontFamily: 'IBMPlexSansArabic_200ExtraLight',
    fontWeight: 'normal',
  },
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: configs.mainColor,
  },
  fonts: configureFonts({config: 
    {
      headlineMedium: {
        fontFamily: "IBMPlexSansArabic_700Bold",
        fontWeight: "bold"
      },
      bodyLarge: {
        fontFamily: "IBMPlexSansArabic_400Regular",
        fontWeight: "normal"
      },
      titleMedium: {
        fontFamily: "IBMPlexSansArabic_400Regular",
        fontWeight: "normal"
      }
  }}),
};


export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    IBMPlexSansArabic_700Bold,
    IBMPlexSansArabic_200ExtraLight,
    IBMPlexSansArabic_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

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

