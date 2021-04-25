import { StyleSheet, Text, SafeAreaView, View, KeyboardAvoidingView, Platform, Modal, Pressable, Image } from 'react-native';
import * as React from "react";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { store } from '../../redux/store';
import * as Actions from '../../redux/actions';
import SignIn from './SignIn';
import * as Utility from '../../redux/utility.js';
import { useSelector } from "react-redux";
import * as styles from "../../constants/account";
import { State } from '../../redux/reducer';


const Register = ({ navigation }: any) => {
  //need to add onSubmit function above, I commented it out bcs it was not working
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [ready, setReady] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const errorMessage = useSelector((state: State) => state.error.erorMessage);
  const status = useSelector((state: State) => state.status);
  const [isUsernameError, setIsUsernameError] = React.useState(false);
  const [isEmailError, setIsEmailError] = React.useState(false);
  const [isPhoneError, setIsPhoneError] = React.useState(false);
  const [isPasswordError, setIsPasswordError] = React.useState(false);

  function isStringValidPassword(password: string): boolean {
    return password.length <= 32 && password.length >= 6;
  }

  function isStringValidUsername(username: string): boolean {
    return username.length <= 32 && username.length >= 3;
  }

  function isStringValidPhoneNumeber(phone: string): boolean {
    let phoneNumberGarbage = new RegExp("[()\\s-]+", "g");
    let phoneNumber = new RegExp("^((\\+[1-9]?[0-9])|0)?[7-9]?[0-9]{9}$");
    if (phone === "") return false;
    phone = phone.replace(phoneNumberGarbage, "");
    return phoneNumber.test(phone);
  }

  function isStringValidEmail(email: string): boolean {
    //Should catch like 99%+ of valid emails
    let emailRegex: RegExp = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
    return emailRegex.test(email);
  }

  React.useEffect(() => {
    if (errorMessage !== "") {
      setModalVisible(true);
    }
  }, [errorMessage]);

  function handleUsernameError() {
    if (isStringValidUsername(userName)) {
      setIsUsernameError(false);
      return;
    }
    setIsUsernameError(true);
  }
  function handleEmailError() {
    if (isStringValidEmail(email)) {
      setIsEmailError(false);
      return;
    }
    setIsEmailError(true);
  }
  function handlePhoneError() {
    if (isStringValidPhoneNumeber(phoneNumber)) {
      setIsPhoneError(false);
      return;
    }
    setIsPhoneError(true);
  }
  function handlePasswordError() {
    if (isStringValidPassword(password)) {
      setIsPasswordError(false);
      return;
    }
    setIsPasswordError(true);
  }

  function handleUsername(e: string) {
    setUserName(e);
    if (isStringValidUsername(e)) setIsUsernameError(false)
  }
  function handleEmail(e: string) {
    setEmail(e); 
    if (isStringValidEmail(e)) setIsEmailError(false)
  }
  function handlePhone(e: string) {
    setPhoneNumber(e); 
    if (isStringValidPhoneNumeber(e)) setIsPhoneError(false)
  }
  function handlePassword(e: string) {
    setPassword(e); 
    if (isStringValidPassword(e)) setIsPasswordError(false)
  }

  async function register() {
    store.dispatch(
      Actions.registerRegularUserThunk({
        username: userName,
        password: password,
        email: email,
        phone: phoneNumber,
      })
    );
  }

  React.useEffect(() => {
    if (isStringValidEmail(email) && isStringValidUsername(userName) && isStringValidPhoneNumeber(phoneNumber) && isStringValidPassword(password)) {
      setReady(true);
      return;
    }
    setReady(false);
  }, [email, password]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.styles.containerMain}>
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
            <Text style={style.modalText}>Registration failed!</Text>
            <Text style={style.modalText}>{errorMessage}</Text>
            <Pressable
              style={[style.modalButton, style.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
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
        <View style={style.margin}>
          <TextInput placeholder="Username" style={styles.styles.textInput} onChangeText={(e) => handleUsername(e)} onBlur={(e) => handleUsernameError()} ></TextInput>
          <Text style={isUsernameError ? style.error : [{ display: 'none' }]}>Username must be at least 3 characters long</Text>
        </View>
        <View style={style.margin}>
          <TextInput keyboardType={"email-address"} placeholder="E-mail" style={styles.styles.textInput} onChangeText={(e) => handleEmail(e)} onBlur={(e) => handleEmailError()}></TextInput>
          <Text style={isEmailError ? style.error : [{ display: 'none' }]}>Email is incorrect</Text>
        </View>
        <View style={style.margin}>
          <TextInput placeholder="Phone number" keyboardType="decimal-pad" style={styles.styles.textInput} onChangeText={(e) => handlePhone(e)} onBlur={(e) => handlePhoneError()}></TextInput>
          <Text style={isPhoneError ? style.error : [{ display: 'none' }]}>Phone number is in a wrong format</Text>
        </View>
        <View style={style.margin}>
          <TextInput maxLength={32} secureTextEntry={true} placeholder="Password" style={styles.styles.textInput} onChangeText={(e) => handlePassword(e)} onBlur={(e) => handlePasswordError()}></TextInput>
          <Text style={isPasswordError ? style.error : [{ display: 'none' }]}>Password must be at least 6 characters long</Text>
        </View>
        <View>
          <TouchableOpacity disabled={!ready} style={ready ? style.button : style.disabledButton} onPress={() => register()}>
            <Text style={style.buttonText}>Register </Text>
          </TouchableOpacity>
        </View>
      </View>
      <SafeAreaView style={styles.styles.bottomView}>
        <Text style={styles.styles.textStyle}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text style={styles.styles.link}>Sign in</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  margin: {
    margin: 7
  },
  error: {
    marginLeft: 15,
    fontSize: 10,
    color: 'red'
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 120
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
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'red'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#09bd09",
    padding: 10,
    borderRadius: 15,
    width: 250,
    margin: 7
  },
  disabledButton: {
    alignItems: "center",
    backgroundColor: "#9da2a6",
    padding: 10,
    borderRadius: 15,
    width: 250,
    margin: 7
  },
  buttonText: {
    color: 'white',
    fontSize: 15
  }
})

export default Register;
