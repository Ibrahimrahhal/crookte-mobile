import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import t from "home/utils/i18n";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{t("hello_world")}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
