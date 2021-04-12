import {
  StyleSheet,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
} from "react-native";
import * as React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import * as Actions from "../../redux/actions";
import * as Utility from "../../redux/utility";
import * as styles from "../../constants/account";
import { State } from "../../redux/reducer";
import { store } from "../../redux/store";
import { clearLoginInformation } from "../../redux/actions";

const SignIn = ({ navigation }: any) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [ready, setReady] = React.useState<boolean>(false);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const loginInfo = useSelector((state: State) => state.loginInformation);
  const errorMessage = useSelector((state: State) => state.error.erorMessage);
  //const wrongUserErrorMessage =
  //"Mobile application is only available for regular users.";
  const loading = useSelector((state: State) => state.loading);

  React.useEffect(() => {
    if (loading) {
      setReady(false);
    }
  }, [loading]);

  React.useEffect(() => {
    if (errorMessage !== "") {
      setModalVisible(true);
    }
  }, [errorMessage]);

  async function signIn() {
    store.dispatch(
      Actions.loginThunk({ username: username, password: password })
    );
  }

  React.useEffect(() => {
    if (
      Utility.isUsernameValid(username) &&
      Utility.isPasswordValid(password)
    ) {
      setReady(true);
      return;
    }
    setReady(false);
  }, [username, password]);

  React.useEffect(() => {
    if (loginInfo !== null) {
      if (loginInfo.userType !== "Regular") {
        store.dispatch(Actions.incorrectUserType());
        setModalVisible(true);
        setReady(false);
        return;
      }
      store.dispatch(clearLoginInformation());
    }
  }, [loginInfo]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.styles.containerMain}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Sign-in failed!</Text>
            <Text style={style.modalText}>{errorMessage}</Text>
            <Pressable
              style={[style.modalButton, style.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={style.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View>
        <Image
          style={style.tinyLogo}
          source={require("../../assets/images/dog-paw.png")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Username"
          style={styles.styles.textInput}
          onChangeText={(e) => setUsername(e)}
          value={username}
        ></TextInput>
        <TextInput
          maxLength={32}
          secureTextEntry={true}
          placeholder="Password"
          style={styles.styles.textInput}
          onChangeText={(e) => setPassword(e)}
          value={password}
        ></TextInput>
        <TouchableOpacity
          disabled={!ready}
          style={ready ? style.button : style.disabledButton}
          onPress={() => signIn()}
        >
          <Text style={style.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
      {/* <SafeAreaView style={styles.styles.bottomView}>
        <Text style={styles.styles.textStyle}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.push("Register")}>
          <Text style={styles.styles.link}>Register now</Text>
        </TouchableOpacity>
      </SafeAreaView> */}
    </KeyboardAvoidingView>
  );
};
const style = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 280,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 120,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "red",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#002aff",
    padding: 10,
    borderRadius: 15,
    width: 250,
    margin: 7,
  },
  disabledButton: {
    alignItems: "center",
    backgroundColor: "#9da2a6",
    padding: 10,
    borderRadius: 15,
    width: 250,
    margin: 7,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
});

export default SignIn;
