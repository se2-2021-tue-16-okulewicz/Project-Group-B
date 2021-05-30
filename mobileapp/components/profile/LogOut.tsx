import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { store } from "../../redux/store";
import * as Actions from "../../redux/actions";
import { useSelector } from "react-redux";
import { State } from "../../redux/reducer";

export default function LogOut({ navigation }: any) {
    const loginInfo = useSelector(
        (state: State) => state.loginInformation
      );
    function signOut(){
        store.dispatch(Actions.clearLoginInformation());
        navigation.navigate("Dogs");
    }

    // React.useEffect(() => {
    //     if(loginInfo === null){
    //     navigation.navigate("Dogs");
    //     }
    // },[loginInfo])

    return (
        <View style={{ padding: 7 }}>
            {/* <Text>Hello</Text> */}
            <View style={styles.row}>
                <Text style={{flex:7}}>Sign out</Text>
                <TouchableOpacity style={{flex:1}} onPress={() => signOut()} >
                    <FontAwesomeIcon icon={faSignOutAlt} size={25}></FontAwesomeIcon>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row:
    {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "stretch",
        backgroundColor: "white",
        height: 50,
        justifyContent: "center"
    },
})