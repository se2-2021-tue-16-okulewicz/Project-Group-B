import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    containerMain: {
        backgroundColor:  'rgba(65, 6, 35, 0.7)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      bottomView: {
          borderTopWidth: 1,
          borderColor: '#c2c2c2',
          paddingTop: 0,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
        backgroundColor: 'white'
      },
      textStyle: {
        color: '#000000',
        fontSize: 15,
      },
      textInput:{
        height: 40, 
        width: 250,
        margin: 7,
        backgroundColor: 'white',
        borderColor: '#c2c2c2', 
        borderWidth: 1,
        borderRadius: 15,
        paddingLeft:10
      },
      logo:{
          fontSize:40,
          fontWeight: 'bold',
          position: 'absolute',
          top: 50,
          color:'white',
      },
      logInButton:{
          color: '#0055ff'
      },
      link:{
        textDecorationLine: 'underline',
        fontSize: 14,
        color: 'magenta'
      },
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});