import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import t from "home/utils/i18n";
import { useState } from "react";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.text}>
        {t("login_welcome")}
      </Text>
      <Text
        variant="bodyLarge"
        style={{ ...styles.text, ...styles.firstInputFeild }}
      >
        {t("login_welcome_sub")}
      </Text>
      <TextInput
        style={styles.textInput}
        label={t("login_phone_number")}
        mode="outlined"
        value={phoneNumber}
        right={<TextInput.Icon icon="phone" style={styles.textRightIcons} />}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={{
          marginTop: 20,
          ...styles.textInput,
        }}
        label={t("login_password")}
        mode="outlined"
        secureTextEntry={!isShowPassword}
        value={password}
        right={
          <TextInput.Icon
            style={styles.textRightIcons}
            icon={isShowPassword ? "eye-off" : "eye"}
            onPress={() => setIsShowPassword(!isShowPassword)}
          />
        }
        onChangeText={(text) => setPassword(text)}
      />
      <View>
        <Button
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={styles.button}
        >
          {t("login_button")}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "10%",
    paddingLeft: "5%",
    paddingRight: "5%",
    direction: Platform.OS == "ios" ? "ltr" : "rtl",
  },
  text: {
    textAlign: Platform.OS == "ios" ? "right" : "left",
  },
  firstInputFeild: {
    marginTop: 10,
    marginBottom: "10%",
  },
  textInput: {
    direction: "rtl",
    height: 60,
  },
  textRightIcons: {
    marginTop: 12,
  },
  button: {
    height: 50,
    justifyContent: "center",
    marginTop: "10%",
  },
});
