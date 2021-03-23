import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Card,
  CardHeader,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import DateFnsUtils from "@date-io/date-fns";
import ImageUpload from "./ImageUpload";
import {
  ColorTypes,
  HairTypes,
  SizeTypes,
  EarsTypes,
  TailTypes,
  SpecialMarkTypes,
  BehaviorsTypes,
  BreedTypes,
} from "../dog/dogEnums";
import { initLostDogProps, initPicture } from "../dog/dogClasses";
import { ILostDog, IPicture } from "../dog/dogInterfaces";
import Chip from "@material-ui/core/Chip";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import * as Actions from "../app/actions";
import { store } from "../app/store";
import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    card: {
      color: "aliceblue",
      backgroundColor: "aliceblue",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default function RegisterDogForm() {
  var isRegisterEnabled = sessionStorage.getItem("enable") === "true";
  var isInputNotNull = sessionStorage.getItem("lostDogFields") != null;
  const [registerEnabled, setRegisterEnabled] = useState(
    isRegisterEnabled as Boolean
  );
  if (!isRegisterEnabled && isInputNotNull) {
    var x = JSON.parse(sessionStorage.getItem("lostDogFields") as string);
  }
  const [lostDogFields, setLostDogFields] = useState<ILostDog>(
    !isRegisterEnabled && isInputNotNull ? x : initLostDogProps
  );
  sessionStorage.setItem("lostDogFields", JSON.stringify(lostDogFields));
  const [picture, setPicture] = useState<IPicture>(initPicture);

  const inputsHandler = (e: { target: { name: any; value: any } }) => {
    var newField = { ...lostDogFields, [e.target.name]: e.target.value };
    setLostDogFields(newField);
    sessionStorage.setItem("inputField", JSON.stringify(newField));
  };

  function calendarHandler(date: MaterialUiPickersDate): void {
    var newField = { ...lostDogFields, dateLost: date as Date };
    setLostDogFields(newField);
    sessionStorage.setItem("inputField", JSON.stringify(newField));
  }

  const inputArrayHandler = (e: { target: { name: any; value: any } }) => {
    var newField = {
      ...lostDogFields,
      location: { ...lostDogFields.location, [e.target.name]: e.target.value },
    };
    setLostDogFields(newField);
    sessionStorage.setItem("inputField", JSON.stringify(newField));
  };
  const selectsHandler = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    var newField = {
      ...lostDogFields,
      [e.target.name as string]: e.target.value,
    };
    setLostDogFields(newField);
    sessionStorage.setItem("inputField", JSON.stringify(newField));
  };

  const canSave = true;
  const classes = useStyles();

  const [cookies, setCookie, removeCookie] = useCookies();

  const onSavePostClicked = () => {
    try {
      registerDog(lostDogFields, picture);
    } catch (err) {
      console.error("Failed to save the dog: ", err);
    }
  };

  function registerDog(dog: ILostDog, picture: IPicture) {
    store.dispatch(
      Actions.addDogThunk({
        dog: dog,
        picture: picture,
        cookies: cookies
      })
    );
  }

  const handlePicturesChange = (event: any) => {
    if (event) {
      (event as File).arrayBuffer().then((fileBuffer) => {
        setPicture({
          id: 0,
          fileName: event.name, //event.name,
          fileType: event.type,
          data: fileBuffer,
        } as IPicture);
      });
    }
  };

  if (registerEnabled) {
    return (
      <Button
        data-testid="register-button"
        onClick={() => {
          setLostDogFields(initLostDogProps);
          sessionStorage.setItem(
            "inputField",
            JSON.stringify(initLostDogProps)
          );
          sessionStorage.setItem("enable", "false");
          setRegisterEnabled(false);
        }}
        color="primary"
        variant="contained"
      >
        Register Dog
      </Button>
    );
  } else {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container alignContent="space-between" spacing={5}>
          <Grid
            container
            item
            xs={5}
            direction="column"
            alignContent="stretch"
            spacing={1}
          >
            <FormControl className={classes.formControl}>
              <InputLabel shrink id="name-label">
                Name
              </InputLabel>
              <Input
                data-testid="name-input"
                id="name"
                name="name"
                value={lostDogFields.name}
                onChange={inputsHandler}
                required
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Card className={classes.card}>
                <CardHeader title="" />
                <ImageUpload
                  data-testid="img-upload"
                  handlePicturesChange={(
                    file: React.ChangeEvent<{ value: unknown }>
                  ) => handlePicturesChange(file)}
                />
              </Card>
            </FormControl>
          </Grid>
          <Grid
            container
            item
            xs={3}
            direction="column"
            alignContent="stretch"
            spacing={1}
          >
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel shrink id="age-label">
                Age
              </InputLabel>
              <TextField
                data-testid="age-input"
                type="number"
                id="age"
                name="age"
                value={lostDogFields.age}
                onChange={inputsHandler}
                required
              />
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="color-label">Color</InputLabel>
              <Select
                data-testid="color-select"
                native
                label="Color"
                labelId="color-label"
                id="color"
                name="color"
                value={lostDogFields.color}
                onChange={selectsHandler}
                displayEmpty
              >
                <option key={"color-key"} aria-label="None" value="" />
                {Object.values(ColorTypes)
                  .filter((k) => isNaN(Number(k)))
                  .map((type: string | ColorTypes) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="hair-label">Hair</InputLabel>
              <Select
                data-testid="hair-select"
                native
                label="hair"
                labelId="hair-label"
                value={lostDogFields.hairLength}
                name="hairLength"
                onChange={selectsHandler}
                displayEmpty
              >
                <option key={"hair-type"} aria-label="None" value="" />
                {Object.values(HairTypes)
                  .filter((k) => isNaN(Number(k)))
                  .map((type: string | HairTypes) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="size-label">Size</InputLabel>
              <Select
                data-testid="size-select"
                native
                labelId="size-label"
                label="size"
                name="size"
                value={lostDogFields.size}
                onChange={selectsHandler}
                displayEmpty
              >
                <option key={"size-type"} aria-label="None" value="" />
                {Object.values(SizeTypes)
                  .filter((k) => isNaN(Number(k)))
                  .map((type: string | SizeTypes) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="ears-label">Ears</InputLabel>
              <Select
                data-testid="ears-select"
                native
                labelId="ears-label"
                label="ears"
                name="earsType"
                value={lostDogFields.earsType}
                onChange={selectsHandler}
                displayEmpty
              >
                <option key={"ears-type"} aria-label="None" value="" />
                {Object.values(EarsTypes)
                  .filter((k) => isNaN(Number(k)))
                  .map((type: string | EarsTypes) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="tail-label">Tail</InputLabel>
              <Select
                data-testid="tail-select"
                native
                labelId="tail-label"
                label="tail"
                name="tailLength"
                value={lostDogFields.tailLength}
                onChange={selectsHandler}
                displayEmpty
              >
                <option key={"tail-type"} aria-label="None" value="" />
                {Object.values(TailTypes)
                  .filter((k) => isNaN(Number(k)))
                  .map((type: string | TailTypes) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="mark-label">Special Mark</InputLabel>
              <Select
                data-testid="mark-select"
                native
                labelId="mark-label"
                label="specialmark "
                name="specialMarks"
                value={lostDogFields.specialMarks}
                onChange={selectsHandler}
                displayEmpty
              >
                <option key={"mark-type"} aria-label="None" value="" />
                {Object.values(SpecialMarkTypes)
                  .filter((k) => isNaN(Number(k)))
                  .map((type: string | SpecialMarkTypes) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="breed-label">Breed</InputLabel>
              <Select
                data-testid="breed-select"
                native
                labelId="breed-label"
                label="breed "
                name="breed"
                value={lostDogFields.breed}
                onChange={selectsHandler}
                displayEmpty
              >
                <option key={"breed-type"} aria-label="None" value="" />
                {Object.values(BreedTypes)
                  .filter((k) => isNaN(Number(k)))
                  .map((type: string | BreedTypes) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            container
            item
            xs={4}
            direction="column"
            alignContent="stretch"
            spacing={1}
          >
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel shrink id="calendar-label">
                Dog was lost on
              </InputLabel>
              <DatePicker
                data-testid="date-select"
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                margin="normal"
                id="date-picker-inline"
                value={lostDogFields.dateLost}
                maxDate={new Date()}
                name="dateLost"
                onChange={(date: any) => calendarHandler(date)}
              />
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel shrink id="city-label">
                City
              </InputLabel>
              <Input
                data-testid="city-input"
                name="city"
                value={lostDogFields.location.city}
                onChange={inputArrayHandler}
              />
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel shrink id="district-label">
                District
              </InputLabel>
              <Input
                data-testid="district-input"
                name="district"
                value={lostDogFields.location.district}
                onChange={inputArrayHandler}
              />
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel shrink htmlFor="behavior-label">
                Behavior
              </InputLabel>
              <Select
                multiple
                labelId="behavior-label"
                label="Behavior"
                name="behaviors"
                value={lostDogFields.behaviors}
                onChange={selectsHandler}
                input={<Input />}
                displayEmpty
                renderValue={(selected: any) => (
                  <div className={classes.chips}>
                    {(selected as string[]).map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
              >
                <MenuItem aria-label="None" value="" />
                {Object.values(BehaviorsTypes)
                  .filter((k) => isNaN(Number(k)))
                  .map((type: string | BehaviorsTypes) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button
                data-testid="submit-button"
                variant="contained"
                onClick={() => onSavePostClicked()}
                color="primary"
                disabled={!canSave}
              >
                Submit
              </Button>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button
                data-testid="cancel-button"
                variant="contained"
                onClick={() => {
                  sessionStorage.setItem("enable", "true");
                  setRegisterEnabled(true);
                }}
                color="secondary"
              >
                Cancel
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}
