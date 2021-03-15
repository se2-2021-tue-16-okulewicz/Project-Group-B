import 'date-fns';
import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardHeader, CardMedia, Container, Input, MenuItem, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export enum BreedTypes { 'Labrador', 'German Shepherd', 'Bulldog' }
export enum ColorTypes {
    "Black", "White", "Brown", "Ginger", "Gold", "Blue", "Gray", "Cream", "Yellow", "Other",
}
export enum HairTypes { "Short", "Medium", "Long" }
export enum SizeTypes { "Small", "Medium", "Large" }
export enum HeightTypes { "Low", "Medium", "Tall" }
export enum EarsTypes { "Standing", "Hanging" }
export enum TailTypes { "Long", "Short" }
export enum SpecialMarkTypes { "Tattoo", "Collar", "Scar", "None" }
export enum BehavioursTypes { "Shy", "Energetic", "Friendly" }



export interface IDogState {
        name: string,
        age: number,
        hair: string,
        color: string,
        size: string,
        ears: string,
        tail: string,
        specialMark: string,
        behaviour: [{ behaviourID: number, behaviourName: string }],
        location: { city: string, district: string },
        selectedDate: Date | null
}
//const [dog, setDog] = useState<IDogState|undefined>(undefined)

export interface IDogProps {
        name: string
        age: number
        hair: string
        color: string
        size: string
        ears: string
        tail: string
        specialMark: string
        [index: number] : { behaviourID: number, behaviourName: string }
        location: { city: string, district: string }
        selectedDate: Date | null
}

export const defaultProps = {
    name: "",
    age: 0,
    hair: HairTypes[0],
    color: ColorTypes[0],
    size: SizeTypes[0],
    ears: EarsTypes[0],
    tail: TailTypes[0],
    specialMark: SpecialMarkTypes[0],
    behaviour: [{ behaviourID: 0, behaviourName: BehavioursTypes[0] }],
    location: { city: "", district: "" },
    selectedDate: new Date()
};

export class Dog extends React.Component<IDogProps, IDogState>{
    
    constructor(props: IDogProps) {
        super(props);
        this.state = {
                name: "",
                age: 0,
                hair: "",
                color: "",
                size: "",
                ears: "",
                tail: "",
                specialMark: "",
                behaviour: [{ behaviourID: 0, behaviourName: "" }],
                location: { city: "", district: "" },
                selectedDate: (new Date())
        };
        this.handleChange = this.handleChange.bind(this);
    }

    //location: { city, district },
    //
    handleChange = (e: { persist: () => void; target: { name: any; value: any; }; }) => {
        //e.persist();
        var el = e.target.name;

        this.setState(state => ({ ...state, el: e.target.value 
        }))
        console.log(this.state.name);
        console.log([e.target.name]);
    }

}

export class LostDog extends Dog {

}
export class FoundDog extends Dog {

}
