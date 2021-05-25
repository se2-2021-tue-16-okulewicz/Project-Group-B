import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Card,
  CardContent,
  Input,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import DateFnsUtils from "@date-io/date-fns";
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
import { ILostDog, IPicture, IShelterDog } from "../dog/dogInterfaces";
import Chip from "@material-ui/core/Chip";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import * as Actions from "../app/actions";
import { store } from "../app/store";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { ValidateFetchedDog } from "../utilityComponents/validation";
import ImageUpload from "../registerDog/ImageUpload";
import config from "../config/config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginBottom: theme.spacing(1.5),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    cardContent: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      color: "aliceblue",
      backgroundColor: "aliceblue",
    },
    mainForm: {
      marginLeft: "0.5%",
      marginRight: "0.5%",
      marginTop: "0.009%",
    },
  })
);

export default function RegisterShelterDogForm() {
  //if enable is session storage is null, the form has just been opened
  const history = useHistory();
  const classes = useStyles(); // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  let isInputNotNull = sessionStorage.getItem("lostDogFields") != null;
  const [lostDogFields, setLostDogFields] = useState<IShelterDog>(
    isInputNotNull
      ? JSON.parse(sessionStorage.getItem("lostDogFields") as string)
      : initLostDogProps
  );

  sessionStorage.setItem("lostDogFields", JSON.stringify(lostDogFields));
  const [picture, setPicture] = useState<IPicture>(initPicture);

  const inputsHandler = (e: { target: { name: any; value: any } }) => {
    let newField = { ...lostDogFields, [e.target.name]: e.target.value };
    setLostDogFields(newField);
    sessionStorage.setItem("inputField", JSON.stringify(newField));
  };

  const selectsHandler = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    let newField = {
      ...lostDogFields,
      [e.target.name as string]: e.target.value,
    };
    setLostDogFields(newField);
    sessionStorage.setItem("inputField", JSON.stringify(newField));
  };

  function clearStorage() {
    sessionStorage.removeItem("lostDogFields");
    sessionStorage.removeItem("inputField");
    sessionStorage.clear();
  }

  const onSubmitClicked = () => {
    try {
      registerDog(lostDogFields, picture);
      store.dispatch(Actions.clearDogList());
      clearStorage();
    } catch (err) {
      console.error("Failed to save the dog: ", err);
    }
    history.push("/shelterlistDogs");
    history.go(0);
  };

  const onCancelClick = () => {
    clearStorage();
    store.dispatch(Actions.clearDogList());
    history.push("/shelterlistDogs");
  };

  function registerDog(dog: IShelterDog, picture: IPicture) {
    // dog = ValidateFetchedDog(dog);
    store.dispatch(
      Actions.addShelterDogThunk({
        shelterId: cookies[config.cookies.userId],
        dog: dog,
        picture: picture,
        cookies: cookies,
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
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} data-testid="MainForm">
      <Grid
        className={classes.mainForm}
        container
        alignContent="space-between"
        spacing={7}
      >
        <Grid
          container
          item
          sm={12}
          md={5}
          direction="column"
          alignContent="stretch"
          style={{ marginBottom: 20 }}
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
            <Card className={classes.cardContent}>
              <CardContent className={classes.cardContent}>
                <ImageUpload
                  data-testid="img-upload"
                  handlePicturesChange={(
                    file: React.ChangeEvent<{ value: unknown }>
                  ) => handlePicturesChange(file)}
                />
              </CardContent>
            </Card>
          </FormControl>
        </Grid>
        <Grid
          container
          item
          sm={12}
          md={3}
          direction="column"
          alignContent="stretch"
          style={{ marginBottom: 2 }}
        >
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              label="Age"
              type="number"
              id="age"
              name="age"
              value={lostDogFields.age}
              onChange={inputsHandler}
              InputProps={{
                inputProps: { min: 0, max: 30 },
                endAdornment: (
                  <InputAdornment position="end">Years</InputAdornment>
                ),
              }}
              variant="outlined"
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
        </Grid>
        <Grid
          container
          item
          sm={12}
          md={4}
          direction="column"
          alignContent="stretch"
          style={{ marginBottom: 10 }}
        >
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
              name="specialMark"
              value={lostDogFields.specialMark}
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
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="behavior-label">
              Behavior
            </InputLabel>
            <Select
              multiple
              labelId="behavior-label"
              label="Behavior"
              name="behaviors"
              value={lostDogFields.behaviors}
              onChange={selectsHandler}
              input={<OutlinedInput label="Behavior" />}
              displayEmpty
              renderValue={(selected: any) => (
                <div className={classes.chips}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
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
              onClick={() => onSubmitClicked()}
              color="primary"
            >
              Submit
            </Button>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              data-testid="cancel-button"
              variant="contained"
              onClick={onCancelClick}
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
