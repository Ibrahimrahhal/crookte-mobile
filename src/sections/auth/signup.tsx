import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import t from "home/utils/i18n";
import { useState } from "react";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import configs from "configs/index";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRepeatPassword, setIsShowRepeatPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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
          {currentStep === 0 && (
            <>
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
            </>
          )}
          <>
            {currentStep === 1 && (
              <>
                <TextInput
                  style={{
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
                    <TextInput.Icon
                      icon="phone"
                      style={styles.textRightIcons}
                    />
                  }
                  onChangeText={(text) => setPhoneNumber(text)}
                />
              </>
            )}
          </>

          {currentStep === 2 && (
            <>
              <TextInput
                style={{
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
            </>
          )}
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              alignContent: "center",
            }}
          >
            {currentStep !== 2 ? (
              <Button
                mode="contained"
                onPress={() => setCurrentStep(currentStep + 1)}
                style={{ ...styles.button, flexGrow: 1, marginRight: 10 }}
              >
                {t("next_button")}
              </Button>
            ) : (
              <Button
                mode="contained"
                onPress={() => console.log("Pressed")}
                style={{ ...styles.button, flexGrow: 1, marginRight: 10 }}
              >
                {t("signup_button")}
              </Button>
            )}
            {currentStep > 0 && (
              <Button
                mode="text"
                onPress={() => setCurrentStep(currentStep - 1)}
                style={{ ...styles.button, opacity: 0.5 }}
              >
                <AntDesign
                  name="arrowright"
                  size={24}
                  color={configs.mainColor}
                />
              </Button>
            )}
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
