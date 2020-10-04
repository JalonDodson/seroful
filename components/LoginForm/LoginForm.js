import React, { useState } from "react";
import * as api from "../../util/api";

import {
  Button,
  Divider,
  Modal,
  Portal,
  Provider,
  Text,
  Title,
  TextInput,
} from "react-native-paper";
import { Image, View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Molecule from "../../rss/molecule.png";
import Seroful from "../../rss/seroful.png";

export const LoginForm = () => {
  const [enableRegister, setEnableRegister] = useState(false);
  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");

  const [pw, setPw] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const registerUser = () => {
    const userData = {
      first: first,
      last: last,
      email: email,
      pw: pw,
    };

    try {
      api.userRegister(userData);
      setPw("");
      setEmail("");
    } catch (err) {
      console.log(err);
    }
  };

  const loginUser = () => {
    const userData = {
      email: email,
      pw: pw,
    };
    try {
      api.userLogin(userData);

      setPw("");
      setEmail("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleBack = () => {
    setEnableRegister(false);
    setPw("");
    setEmail("");
  };

  if (!enableRegister) {
    return (
      <LinearGradient
        colors={["#b100fe", "#8901d9", "#3f0163"]}
        style={loginStyles.linearGradient}
      >
        <View style={loginStyles.modal}>
          <Image source={Seroful} style={loginStyles.image} />
          <Image source={Molecule} style={loginStyles.image} />

          <TextInput
            label="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
            style={loginStyles.textInput}
            mode="filled"
          />
          <TextInput
            textContentType="password"
            label="Password"
            value={pw}
            onChangeText={(pw) => setPw(pw)}
            secureTextEntry
            style={loginStyles.textInput}
            mode="filled"
          />
          <Button
            style={loginStyles.button1}
            onPress={() => loginUser()}
            mode="contained"
            color="#4B8AC6"
            uppercase={false}
          >
            Login
          </Button>
          <Button
            style={loginStyles.button2}
            onPress={() => setEnableRegister(true)}
            mode="contained"
            color="#4B8AC6"
            uppercase={false}
          >
            Register
          </Button>
        </View>
      </LinearGradient>
    );
  }
  return (
    <Provider>
      <Portal>
        <Modal visible={enableRegister} onDismiss={hideModal}>
          <LinearGradient
            colors={["#b100fe", "#8901d9", "#3f0163"]}
            style={loginStyles.linearGradient}
          >
            <View style={loginStyles.modal}>
              <Image source={Seroful} style={loginStyles.image} />
              <Image source={Molecule} style={loginStyles.image} />
              <TextInput
                label="First Name"
                value={first}
                onChangeText={(first) => setFirst(first)}
                mode="outlined"
                style={loginStyles.rName}
              />
              <TextInput
                label="Last Name (optional)"
                value={last}
                onChangeText={(last) => setLast(last)}
                mode="outlined"
                style={loginStyles.rName}
              />
              <TextInput
                label="Email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                mode="outlined"
                style={loginStyles.rEmail}
              />
              <TextInput
                textContentType="password"
                type
                mode="outlined"
                label="Password"
                value={pw}
                secureTextEntry
                onChangeText={(pw) => setPw(pw)}
                style={loginStyles.rPassword}
              />
              <Button
                icon="arrow-left"
                mode="contained"
                color="#4B8AC6"
                onPress={() => handleBack()}
                style={loginStyles.loginButton}
                uppercase={false}
              >
                Login
              </Button>
              <Button
                mode="contained"
                color="#4B8AC6"
                onPress={() => registerUser()}
                style={loginStyles.registerButton}
                uppercase={false}
              >
                Register
              </Button>
            </View>
          </LinearGradient>
        </Modal>
      </Portal>
    </Provider>
  );
};

const loginStyles = StyleSheet.create({
  modal: {
    display: "flex",
    opacity: 1,
    height: "100%",
  },
  textInput: {
    color: "black",
    alignSelf: "center",
    width: "65%",
  },
  image: {
    alignSelf: "center",
  },
  button1: {
    alignSelf: "flex-start",
    marginTop: "1%",
    marginLeft: "17.5%",
    width: "30%",
  },
  button2: {
    alignSelf: "flex-end",
    marginTop: "-9.5%",
    marginRight: "17.5%",
    width: "30%",
  },
  registerButton: {
    width: "31.5%",
    marginRight: "17.5%",
    marginTop: "-9.50%",
    alignSelf: "flex-end",
  },
  loginButton: {
    alignSelf: "flex-start",
    marginTop: "1%",
    marginLeft: "17.5%",
    width: "31.5%",
  },
  rName: {
    alignSelf: "center",
    marginTop: "-2%",
    width: "65%",
  },
  rEmail: {
    alignSelf: "center",
    marginTop: "0%",
    width: "65%",
  },
  rPassword: {
    width: "65%",
    marginTop: "-2%",
    alignSelf: "center",
  },
});
