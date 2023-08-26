import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import t from "home/utils/i18n";
import { useState } from "react";
import * as Animatable from "react-native-animatable";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRepeatPassword, setIsShowRepeatPassword] = useState(false);
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Animatable.View animation="fadeIn">
          <Text variant="headlineMedium" style={styles.text}>
            {t("sign_welcome")}
          </Text>
          <Text
            variant="bodyLarge"
            style={{ ...styles.text, ...styles.firstInputFeild }}
          >
            {t("signup_welcome_sub")}
          </Text>
          <TextInput
            style={styles.textInput}
            label={t("signup_first_name")}
            mode="outlined"
            value={firstName}
            right={
              <TextInput.Icon
                icon="form-textbox"
                style={styles.textRightIcons}
              />
            }
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            style={{
              marginTop: 20,
              ...styles.textInput,
            }}
            label={t("signup_last_name")}
            mode="outlined"
            value={lastName}
            right={
              <TextInput.Icon
                icon="form-textbox"
                style={styles.textRightIcons}
              />
            }
            onChangeText={(text) => setLastName(text)}
          />
          <TextInput
            style={{
              marginTop: 20,
              ...styles.textInput,
            }}
            label={t("signup_national_id")}
            mode="outlined"
            value={nationalId}
            right={
              <TextInput.Icon
                icon="card-account-details"
                style={styles.textRightIcons}
              />
            }
            onChangeText={(text) => setNationalId(text)}
          />
          <TextInput
            style={{
              marginTop: 20,
              ...styles.textInput,
            }}
            label={t("login_phone_number")}
            mode="outlined"
            value={phoneNumber}
            right={
              <TextInput.Icon icon="phone" style={styles.textRightIcons} />
            }
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
          <TextInput
            style={{
              marginTop: 20,
              ...styles.textInput,
            }}
            label={t("signup_repeat_password")}
            mode="outlined"
            secureTextEntry={!isShowRepeatPassword}
            value={repeatPassword}
            right={
              <TextInput.Icon
                style={styles.textRightIcons}
                icon={isShowRepeatPassword ? "eye-off" : "eye"}
                onPress={() => setIsShowRepeatPassword(!isShowPassword)}
              />
            }
            onChangeText={(text) => setRepeatPassword(text)}
          />
          <View>
            <Button
              mode="contained"
              onPress={() => console.log("Pressed")}
              style={styles.button}
            >
              {t("signup_button")}
            </Button>
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "10%",
    paddingLeft: "5%",
    paddingRight: "5%",
    direction: Platform.OS == "ios" ? "ltr" : "rtl",
  },
  container: {
    flex: 1,
    paddingBottom: 100,
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
