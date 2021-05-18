import { FormControl, TextField, InputLabel, Select } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";

//only string, issue with debouncing
export const InputFormControl = (props: any) => {
    const [selectedValue, setSelectedValue] = useState(props.value ? props.value : "");
    const updateForm = (e: { target: { name?: any; value: any } }) => {
        setSelectedValue(e.target.value);
        setTimeout(() => {
            props.updateForm(e as React.ChangeEvent<{ name?: string, value: string }>);
        }, 4000)
    }
    return (
        <FormControl variant="outlined" className={props.class}>
            <TextField
                size="small"
                className={props.name}
                label={(props.name as string).charAt(0).toUpperCase() + props.name.slice(1)}
                id={props.name as string}
                name={props.name}
                value={selectedValue}
                onChange={updateForm}
                variant="outlined"
            >
            </TextField>
        </FormControl>);
}

export const DateFormControl = (props: any) => {
    const [selectedValue, setSelectedValue] = useState(props.value ? props.value : null);
    if(selectedValue == null && props.value != null){
        props.updateForm(selectedValue,props.name);
    }
    function updateForm(date: MaterialUiPickersDate, name: string): void {
        setSelectedValue(date as Date);
        props.updateForm(date, name);
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl variant="outlined" className={props.class} margin="dense">
            <DatePicker
                variant="dialog"
                size="small"
                inputVariant="outlined"
                format="yyyy-MM-dd"
                label={(props.label as string)}
                name={props.name}
                value={selectedValue}
                onChange={(date: any) => updateForm(date, props.name)}
                minDate={props.minDate}
                maxDate={props.maxDate}
                clearable={true}
                onTouchCancel={(date: any) => updateForm(new Date(1900, 1, 1, 0, 0, 0, 0), props.name)}
                onAbort={(date: any) => updateForm(new Date(1900, 1, 1, 0, 0, 0, 0), props.name)}
            />
        </FormControl>
        </MuiPickersUtilsProvider>
    );
}
//(date: any) => calendarHandler(date, "dateLostBefore")
export const SelectFormControl = (props: any) => {
    const [selectedValue, setSelectedValue] = useState(props.value ? props.value : "");
    const updateForm = (e: { target: { name?: any; value: any } }) => {
        setSelectedValue(e.target.value);
        props.updateForm(e as React.ChangeEvent<{ name?: string, value: unknown }>);
    }
    return (
        <FormControl variant="outlined" className={props.class} margin="dense">
            <InputLabel htmlFor={(props.name as string) + "-label"}>{(props.name as string).charAt(0).toUpperCase() + props.name.slice(1)}</InputLabel>
            <Select
                className={props.name}
                native
                label={(props.name as string)}
                labelId={(props.name as string) + "-label"}
                name={props.name}
                value={selectedValue}
                onChange={updateForm}
                displayEmpty
            >
                <option key={(props.name as string) + "-key"} aria-label="None" value="" />
                {Object.entries(props.options).map(([key, value]) => (
                    <option key={value as string} value={String(key as string).split('_').join('.')}>
                        {value as string}
                    </option>
                ))}
            </Select>
        </FormControl>);
}