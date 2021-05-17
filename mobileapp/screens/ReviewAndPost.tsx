import React, { useState, useEffect } from 'react';
import {
    View,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    Button
} from 'react-native';
//import Autocomplete from 'react-native-autocomplete-input';
import * as ImagePicker from 'expo-image-picker';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { State } from '../redux/reducer';
import * as dogEnums from "../components/dogs/dog/dogArrays";
import * as dogTypes from "../components/dogs/dog/dogEnums"
import DropDownInput from "./dropDownInput";
import NumericInput from 'react-native-numeric-input'
import { IDogCharacteristics, IDogDetails } from '../components/dogs/dog/dogInterfaces';
import { BehaviorsTypes } from '../components/dogs/dog/dogEnums';
import { store } from '../redux/store';
import * as Actions from "../redux/actions";
import { initLostDogCharacteristics } from "../components/dogs/dog/dogClasses";
import TextField from "./TextField"
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { initDogDetails } from "../components/dogs/dog/dogClasses"
import Bubble from './Bubble';



// import DatePicker from 'react-native-datepicker';

export default function ReviewAndPost() {
    const today = new Date();
    const image = useSelector((state: State) => state.image);
    const dogPicture = useSelector((state: State) => state.picture);
    const dogCharacteristics = useSelector((state: State) => state.dogCharacteristics);
    const dogDetails = useSelector((state: State) => state.dogDetails);
    const [scroll, setScroll] = useState<boolean>(true);
    const [characteristics, setCharacteristics] = useState<IDogCharacteristics>(dogCharacteristics);
    const [details, setDetails] = useState<IDogDetails>(dogDetails);
    const [date, setDate] = useState<Date>(new Date(details.dateLost));
    const [city, setCity] = useState<string>(details.location.city);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        setDate(date);
        let newDetails = { ...details, dateLost: date.toISOString() }
        setDetails(newDetails);
        console.log("A date has been picked: ", convertDate(date.toISOString()));
        hideDatePicker();
    };

    function convertDate(inputFormat: string) {
        function pad(s: any) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-')
    }
    function handleLocationChange({ name, value }: any) {
        let newDetails = { ...details, location: { ...details.location, [name as string]: value }, dateLost: date.toISOString() }
        setDetails(newDetails as IDogDetails);
        validateFields(newDetails);
    }

    function areValidDetails(ch: IDogDetails) {
        return (ch.location.city !== initDogDetails.location.city && ch.location.district != initDogDetails.location.district);
    }
    function validateFields(ch: IDogDetails) {
        if (areValidDetails(ch)) {

            store.dispatch(Actions.setDogDetails(ch));
        }
    }



    return (
        <View style={{ padding: 7, backgroundColor: "#ffffff", borderRadius: 5 }}>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <View style={[styles.row, { height: 100, padding: "1%" }]}>
                <View style={{ flex: 2, paddingRight: 10, paddingVertical: "10%" }}>
                    <Image
                        style={{ width: "100%", height: "100%", borderRadius: 100 }}
                        source={{
                            uri: `data:${dogPicture.fileType};base64,${dogPicture.data}`,
                        }}
                    />
                </View>
                <View style={{ flex: 6 }}>
                    <View style={{ marginRight: "5%" }}>
                        {/* <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>Lost on</Text> */}
                        <View style={[styles.row,]}>
                            {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
                            <View style={{ flex: 1 }}>
                                <TextField value={convertDate(date.toISOString())} placeholder="Lost on" />
                            </View>


                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignContent: "center" }} onPress={showDatePicker} >
                                <FontAwesomeIcon icon={faCalendarAlt} size={25} ></FontAwesomeIcon>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>City</Text>
                    <TextInput editable defaultValue={details.location.city} placeholder="City" style={styles.input} onChangeText={value => handleLocationChange({ name: "city", value: value })}></TextInput>
                    <View
                        style={{
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                        }}
                    />

                    <View style={{ paddingTop: 12 }}>
                        <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>District</Text>
                        <TextInput editable defaultValue={details.location.district} placeholder="District" style={styles.input} onChangeText={value => handleLocationChange({ name: "district", value: value })}></TextInput>
                        <View
                            style={{
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                            }}
                        />
                    </View>
                </View>
            </View>
            <View style={{ marginBottom: "20%" }}></View>
            {/* <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> */}
            <ScrollView style={{ backgroundColor: "#e8e9ed", borderRadius: 5, padding: 10 }}
                scrollEnabled={scroll}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView>
                    <Image source={{ uri: image }}></Image>


                    <View style={styles.row}>
                        <View style={{ width: "62%", marginRight: "5%" }}>
                            <TextField value={dogCharacteristics.name} placeholder="Name"></TextField>
                        </View>

                        <View style={{ width: "20%" }}>
                            <TextField value={dogCharacteristics.age} placeholder="Age"></TextField>
                        </View>
                    </View>

                    <TextField value={dogCharacteristics.breed} placeholder="Breed" />
                    <TextField value={dogCharacteristics.color} placeholder="Color" />
                    <TextField value={dogCharacteristics.size} placeholder="Size" />
                    <TextField value={dogCharacteristics.hairLength} placeholder="Hair" />
                    <TextField value={dogCharacteristics.tailLength} placeholder="Tail" />
                    <TextField value={dogCharacteristics.earsType} placeholder="Ears" />
                    <TextField value={dogCharacteristics.specialMark} placeholder="Special mark" />
                    <Text style={{ fontSize: 15, marginLeft: "1%", color: "#006aff" }}>Behaviour</Text>
                    <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>

                        {dogCharacteristics.behaviors.map((item: BehaviorsTypes) => {
                            return (
                                // <Text>{item}</Text>
                                <Bubble key={item} isSelected={true} item={item} placeholder={item}></Bubble>
                            )
                            // 
                        })}
                    </View>
                    <View style={{ marginBottom: "70%" }}></View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "stretch",
    },
    input: {
        backgroundColor: "#fff",
        fontSize: 16,
        marginLeft: "1%",
        paddingTop: "1%",
        borderRadius: 7,
        color: 'black',
        paddingRight: 30,
    },
    containerStyle: {
        padding: 5
    },
    textInputStyle: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#FAF7F6',
    },
    itemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#FAF9F8',
        borderColor: '#bbb',
        borderWidth: 1,
    },
    itemTextStyle: {
        color: '#222',
    },
    itemsContainerStyle: {
        maxHeight: '60%',
    }
});