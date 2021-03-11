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
//import store from "../../redux/store";
//import * as Actions from "../../redux/actions";
//import { dateFormat, formatDateTime } from "../../redux/utility";
//import "react-calendar/dist/Calendar.css";
//import Calendar from "react-calendar";
//import AddYesNoPopup from "../../common-components/AddYesNoPopup";

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

export default function AddCarForm(props: any) {
    const [name, setName] = useState('');
    const [picture, setPictures] = useState('');
    const [hair, setHair] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [ears, setEars] = useState('');
    const [tail, setTail] = useState('');
    const [specialMark, setSpecialMark] = useState('');
    const [behaviour, setBehaviour] = useState('');
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
    const [dailyPrice, setDailyPrice] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [plateNumber, setPlateNumber] = useState("");
    const [file, setFile] = useState("");
    const [IsSavePopup, setIsSavePopup] = useState(false); //display save y/n popup
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
        //dailyPrice,
        //plateNumber,
    ].every(Boolean);
    const classes = useStyles();

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                //'2', '20', 'Pretty nice model no 2', '2020-12-17 23:00:00.000000', 'Somewhere', 'Random idk', 'Model 2', 'C0 XDDD', '2020-12-12 23:00:00.000000', 'Outdated', 'idk some tags'
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
                    //status: "Free",
                    //startDateTime: formatDateTime(startDateTime),
                    //endDateTime: formatDateTime(endDateTime),
                    //dailyPrice: dailyPrice,
                    //description: description,
                    //tags: tags,
                    //plateNumber: plateNumber,
                };
                //addCar(car, props.cookies.get("cookie"));
                setName("");
            } catch (err) {
                console.error("Failed to save the post: ", err);
            }
        }
    };

    //function addCar({car}:any, {token}:any) {
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
        setBehaviour(event.target.value as string);
    };
    const handlePicturesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        if (event.target) {
            setPictures(event.target.value as string);
        }
    };
    const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCity(event.target.value as string);
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
            <Grid container xs={12} alignContent="space-between" spacing={5}>
                <Grid container item xs={5} direction="column" alignContent="stretch" spacing={1}>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="name-label">
                            Name
                        </InputLabel>
                        <Input
                            id="name"
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
                        <InputLabel shrink id="color-label">
                            Color
                        </InputLabel>
                        <Select
                            labelId="color-label"
                            id="color"
                            value={color}
                            onChange={handleColorChange}
                            displayEmpty
                        />
                        <MenuItem value="black">Black</MenuItem>
                        <MenuItem value="brown">Brown</MenuItem>
                        <MenuItem value="white">White</MenuItem>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="hair-label">
                            Hair length
                        </InputLabel>
                        <Select
                            labelId="hair-label"
                            id="hair"
                            value={hair}
                            onChange={handleHairChange}
                            displayEmpty
                        />
                        <MenuItem value="short">Short</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="long">Long</MenuItem>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="size-label">
                            Size
                        </InputLabel>
                        <Select
                            labelId="size-label"
                            id="size"
                            value={size}
                            onChange={handleSizeChange}
                            displayEmpty
                        />
                        <MenuItem value="small">Small</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="large">Large</MenuItem>
                        <MenuItem value="giant">Giant</MenuItem>
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
                        />
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
                        />
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
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="behaviour-label">
                            Behaviour
                        </InputLabel>
                        <Select
                            labelId="behaviour-label"
                            id="behaviour"
                            value={behaviour}
                            onChange={handleBehaviourChange}
                            displayEmpty
                        />
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
        </MuiPickersUtilsProvider >
    )
    /* return (

        <div className="popup-car-box">

                <div className="car-box">
                    <div className="car-container">
                        <div className="left">
                            <div className="image-box">

                            </div>
                            <div className="tags">
                                <div className="tags">Tags: </div>
                                <input
                                    className="tagsvalue"
                                    type="text"
                                    id="carTags"
                                    name="carTags"
                                    value={tags}
                                    placeholder="#Tag"
                                    onChange={(e) => setTags(e.target.value)}
                                ></input>
                            </div>
                        </div>
                        <div className="right">
                            <div className="carProperties">
                                <form>
                                    <table>
                                        <tbody>
                                            <tr>

                                                <td className="property">Car Name: </td>
                                                <td>
                                                    <input
                                                        className="value"
                                                        type="text"
                                                        id="carName"
                                                        name="carName"
                                                        value={name}
                                                        placeholder="Name length is 0"
                                                        required
                                                        onChange={(e) => setName(e.target.value)}
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="property">Model: </td>
                                                <td>
                                                    <input
                                                        className="value"
                                                        type="text"
                                                        id="carModel"
                                                        name="carModel"
                                                        value={model}
                                                        placeholder="Model length is 0"
                                                        required
                                                        onChange={(e) => setModel(e.target.value)}
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="property">Location: </td>
                                                <td>
                                                    <input
                                                        className="value"
                                                        type="text"
                                                        id="carLocation"
                                                        name="carLocation"
                                                        value={location}
                                                        placeholder="Location length is 0"
                                                        required
                                                        onChange={(e) => setLocation(e.target.value)}
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="property">Status: </td>

                                                <td>
                                                    <input
                                                        className="value"
                                                        placeholder="Free"
                                                        disabled={true}
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="property">Daily price: </td>
                                                <td>
                                                    <input
                                                        className="value"
                                                        type="number"
                                                        id="carDailyPrice"
                                                        name="carDailyPrice"
                                                        value={dailyPrice}
                                                        placeholder={'0'}
                                                        required={true}
                                                        onChange={(e) => setDailyPrice(e.target.value)}
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="plateproperty">Plate number: </td>
                                                <td>
                                                    <input
                                                        className="platevalue"
                                                        type="text"
                                                        id="carPlateNumber"
                                                        name="carPlateNumber"
                                                        value={plateNumber}
                                                        placeholder="Plate number length is 0"
                                                        required={true}
                                                        onChange={(e) => setPlateNumber(e.target.value)}
                                                    ></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="descproperty">Description:</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <textarea
                                        className="description"
                                        id="carDescription"
                                        name="carDescription"
                                        value={description}
                                        required={true}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </form>
                            </div>
                            <span style={{ display: "flex", marginLeft: "5%" }}>
                                <button
                                    className="customButton"
                                    onClick={() => setIsSavePopup(true)}
                                    disabled={!canSave}
                                >
                                    Save
              </button>
                                <button className="customButton" onClick={props.handleGoBack}>
                                    Go back
              </button>
                            </span>
                            {/*IsSavePopup && (
              <AddYesNoPopup
                handleClose={() => setIsSavePopup(false)}
                title="Save"
                content={`Are you sure you want to save this car?`}
                handleYes={onSavePostClicked}
                handleNo={() => setIsSavePopup(false)}
              />
            )}
                    </div>
                </div>
            </div>
        </div>
    ); */
}

