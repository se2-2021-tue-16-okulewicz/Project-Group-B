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
import ImageUpload from "./ImageUpload";
import { Dog, IDogState, defaultProps, BreedTypes, ColorTypes, HairTypes, SizeTypes, EarsTypes, TailTypes, SpecialMarkTypes, BehavioursTypes } from "../dog/dogClasses"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

export default function RegisterDogForm() {
    let dog = new Dog(defaultProps);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [picture, setPictures] = useState('');
    const [hair, setHair] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [ears, setEars] = useState('');
    const [tail, setTail] = useState('');
    const [specialMark, setSpecialMark] = useState('');
    const [behaviour, setBehaviour] = React.useState<string[]>([]);
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
    const [registerEnabled, setRegisterEnabled] = useState(false);
    const canSave = [
        name,
        hair,
        city,
        color,
        size,
        ears,
        tail,
        specialMark,
        behaviour,
        selectedDate,
        city, district
    ].every(Boolean);
    const classes = useStyles();

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                const dog = {
                    name: name,
                    hair: hair,
                    color: color,
                    size: size,
                    ears: ears,
                    tail: tail,
                    specialMark: specialMark,
                    behaviour: behaviour,
                    location: { city, district },
                    selectedDate: selectedDate,
                };
                //addCar(car, props.cookies.get("cookie"));
                setName("");
            } catch (err) {
                console.error("Failed to save the post: ", err);
            }
        }
    };

    //function registerDog({car}:any, {token}:any) {
    /* store.dispatch(
      Actions.addCarThunk({
        car,
        token,
        afterAddition: (ids) => {
          if (file) {
            store.dispatch(
              Actions.uploadCarImageThunk({
                file,
                id: ids[0],
                token: props.cookies.get("cookie"),
              })
            );
          }
          store.dispatch(Actions.refreshCarList());
          props.handleGoBack();
        },
      })
    );
  } */
    const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setName(event.target.value as string);
    };
    const handleAgeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };
    const handleHairChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setHair(event.target.value as string);
    };
    const handleColorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setColor(event.target.value as string);
    };
    const handleSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSize(event.target.value as string);
    };
    const handleEarsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEars(event.target.value as string);
    };
    const handleTailChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTail(event.target.value as string);
    };
    const handleMarkChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSpecialMark(event.target.value as string);
    };
    const handleBehaviourChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setBehaviour(event.target.value as string[]);
    };
    const handlePicturesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        if (event.target) {
            setPictures(event.target.value as string);
        }
    };
    const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCity(event.target.value as string);
        console.log(event.target.value);
    };
    const handleDistrictChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDistrict(event.target.value as string);
    };
    /*<DisplayImage
  handleToUpdate={(file) => handleToUpdate(file)}
></DisplayImage>*/

    const [cal, setCal] = useState(false);
    return (

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {!registerEnabled && (<Button disabled={registerEnabled} onClick={() => setRegisterEnabled(true)}>Register Dog</Button>)}
            {registerEnabled && (
                <Grid container xs={12} alignContent="space-between" spacing={5}>
                    <Grid container item xs={5} direction="column" alignContent="stretch" spacing={1}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="name-label">
                                Name
                                    </InputLabel>
                            <Input
                                id="name"
                                name="name"
                                value={name}
                                onChange={handleNameChange}
                                required />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Card >
                                <CardHeader title="" />
                                <ImageUpload handlePicturesChange={(file: React.ChangeEvent<{ value: unknown; }>) => handlePicturesChange(file)} />
                            </Card>
                        </FormControl>
                    </Grid>
                    <Grid container item xs={3} direction="column" alignContent="stretch" spacing={1}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="age-label">
                                Age
                            </InputLabel>
                            <Input
                                id="age"
                                name="age"
                                value={age}
                                onChange={handleAgeChange}
                                required />
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="color-label">Color</InputLabel>
                            <Select
                                native
                                label="Color"
                                labelId="color-label"
                                id="color"
                                value={color}
                                onChange={handleColorChange}
                                displayEmpty
                            >
                                {Object.values(ColorTypes).filter(k => isNaN(Number(k))).map((type: string | ColorTypes) => (
                                    <option id={typeof type} value={type}>
                                        {type}
                                    </option>))}

                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="hair-label">Hair</InputLabel>
                            <Select
                                native
                                label="hair"
                                labelId="hair-label"
                                id="hair"
                                value={hair}
                                onChange={handleHairChange}
                                displayEmpty
                            >
                                {Object.values(HairTypes).filter(k => isNaN(Number(k))).map((type: string | HairTypes) => (
                                    <option value={type}>
                                        {type}
                                    </option>))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="size-label">
                                Size
                        </InputLabel>
                            <Select
                                native
                                labelId="size-label"
                                id="size"
                                value={size}
                                onChange={handleSizeChange}
                                displayEmpty
                            >
                                {Object.values(SizeTypes).filter(k => isNaN(Number(k))).map((type: string | SizeTypes) => (
                                    <option value={type}>
                                        {type}
                                    </option>))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="ears-label">
                                Ears
                        </InputLabel>
                            <Select
                                labelId="ears-label"
                                id="ears"
                                value={ears}
                                onChange={handleEarsChange}
                                displayEmpty
                            >

                                {Object.values(EarsTypes).filter(k => isNaN(Number(k))).map((type: string | EarsTypes) => (
                                    <option value={type}>
                                        {type}
                                    </option>))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="tail-label">
                                Tail
                        </InputLabel>
                            <Select
                                labelId="tail-label"
                                id="tail"
                                value={tail}
                                onChange={handleTailChange}
                                displayEmpty
                            >
                                {Object.values(TailTypes).filter(k => isNaN(Number(k))).map((type: string | TailTypes) => (
                                    <option value={type}>
                                        {type}
                                    </option>))}
                            </Select>

                        </FormControl><FormControl className={classes.formControl}>
                            <InputLabel shrink id="mark-label">
                                Special Mark
                        </InputLabel>
                            <Select
                                labelId="mark-label"
                                id="mark"
                                value={specialMark}
                                onChange={handleMarkChange}
                                displayEmpty
                            >
                                {Object.values(SpecialMarkTypes).filter(k => isNaN(Number(k))).map((type: string | SpecialMarkTypes) => (
                                    <option value={type}>
                                        {type}
                                    </option>))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="behaviour-label">
                                Behaviour
                        </InputLabel>
                            <Select
                                multiple
                                labelId="behaviour-label"
                                id="behaviour"
                                value={behaviour}
                                onChange={handleBehaviourChange}
                                input={<Input />}
                                displayEmpty
                            >
                                {Object.values(BehavioursTypes).filter(k => isNaN(Number(k))).map((type: string | BehavioursTypes) => (
                                    <option value={type}>
                                        {type}
                                    </option>))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container item xs={4} direction="column" alignContent="stretch" spacing={1}>
                        <FormControl className={classes.formControl}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Dog was lost on"
                                value={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="city-label">
                                City
                        </InputLabel>
                            <Input
                                id="city"
                                value={city}
                                onChange={handleCityChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="district-label">
                                District
                        </InputLabel>
                            <Input
                                id="district"
                                value={district}
                                onChange={handleDistrictChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Button variant="contained" onSubmit={onSavePostClicked} color="primary" disabled={canSave}>Submit</Button>
                        </FormControl>
                    </Grid>
                </Grid>
            )}</MuiPickersUtilsProvider >

    )
}

