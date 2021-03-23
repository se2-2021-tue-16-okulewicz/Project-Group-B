import { StyleSheet, Text, SafeAreaView, View, KeyboardAvoidingView, Platform,Modal, Pressable } from 'react-native';
import * as React from "react";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import store from '../../redux/store';
import * as Actions from '../../redux/actions';
import LogIn from './LogIn';
import * as Utility from '../../redux/utility.js';
import { useSelector } from "react-redux";
import * as styles from "../../constants/account";


const Register = ({navigation}: any) => {
    //need to add onSubmit function above, I commented it out bcs it was not working
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [ready, setReady] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);

    async function register() {
        store.dispatch(
          Actions.registerAccountThunk({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: Utility.Encrypt(password),
          })
        );
      }

      const status = useSelector((state) => state.status);
    React.useEffect(() => {
        if (status === "redirectToLogin") {
            setReady(false);
            store.dispatch(Actions.setIdle());
            navigation.pop();
            return;
        }
        if( status === "registering"){
            setReady(false);
            return;
        }
        if(status === "registerError"){
        setReady(true);
        setModalVisible(true);
        }
    }, [status])

      React.useEffect(() => {
        if (Utility.isEmailValid(email) && Utility.isPasswordValid(password) && firstName && lastName) {
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
            <Text style={style.modalText}>Account with this e-mail already exists.</Text>
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
            <TextInput placeholder="First Name" style={styles.styles.textInput} onChangeText={(e) => setFirstName(e)}></TextInput>
            <TextInput placeholder="Last Name" style={styles.styles.textInput} onChangeText={(e) => setLastName(e)}></TextInput>
                <TextInput placeholder="E-mail" style={styles.styles.textInput} onChangeText={(e) => setEmail(e)}></TextInput>
                <TextInput maxLength={32} secureTextEntry={true} placeholder="Password" style={styles.styles.textInput} onChangeText={(e) => setPassword(e)}></TextInput>
                <TouchableOpacity disabled={!ready} style={ready ? style.button : style.disabledButton} onPress={() => register()}>
                  <Text style={style.buttonText}>Register </Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.styles.bottomView}>
                <Text style={styles.styles.textStyle}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <Text style={styles.styles.link}>Log in</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

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
      fontSize : 15
    }
  })

export default Register;
