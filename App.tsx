import 'react-native-gesture-handler';
import EntryNavigator from 'home/navigators/entry';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme,  PaperProvider } from 'react-native-paper';
import configs from 'configs';

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
      
      <EntryNavigator />
    </NavigationContainer>
    </PaperProvider>
  );
}


