import { StyleSheet, Text, SafeAreaView, View, Modal, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import * as React from "react";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import store from '../../redux/store';
import { useSelector } from "react-redux";
import * as Actions from '../../redux/actions';
import * as Utility from '../../redux/utility.js';
import * as styles from "../../constants/account";


const LogIn = ({navigation}: any) => {
    const [email,setEmail ] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [ready, setReady] = React.useState(false);
    const status = useSelector((state) => state.status);
    const [modalVisible, setModalVisible] = React.useState(false);
    
    React.useEffect(() => {
      if(status === "loggingIn" || status === "redirectToCars"){
        setReady(false);
        if(status === "redirectToCars"){
          setEmail("");
          setPassword("");
        }
        return;
      }
      if(status=== "logInError"){
        setReady(true);
        setModalVisible(true);
      }
    },[status]);
    
    async function logIn() {
        store.dispatch(
          Actions.logInThunk({ email: email, password: Utility.Encrypt(password) })
        );
      }

      React.useEffect(() => {
        if (Utility.isEmailValid(email) && Utility.isPasswordValid(password)) {
          setReady(true);
          return;
        }
        setReady(false);
      }, [email, password]);

    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.styles.containerMain}>
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
          <Text style={style.modalText}>Log-in failed!</Text>
            <Text style={style.modalText}>Check your credentials.</Text>
            <Pressable
              style={[style.modalButton, style.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={style.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
            <Text style={styles.styles.logo}>Carly</Text>
            <View>
                <TextInput placeholder="E-mail" style={styles.styles.textInput} onChangeText={(e) => setEmail(e)} value={email}></TextInput>
                <TextInput maxLength={32} secureTextEntry={true} placeholder="Password" style={styles.styles.textInput} onChangeText={(e) => setPassword(e)} value={password}></TextInput>
                <TouchableOpacity disabled={!ready} style={ready ? style.button : style.disabledButton} onPress={() => logIn()}>
                  <Text style={style.buttonText}>Log in</Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.styles.bottomView}>
                <Text style={styles.styles.textStyle}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.push("Register")}>
                    <Text style={styles.styles.link}>Register now</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}
const style = StyleSheet.create({
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
    backgroundColor: "#002aff",
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
    fontSize : 15
  }
})

export default LogIn;
