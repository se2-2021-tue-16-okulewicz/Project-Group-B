import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Card,
  CardContent,
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
    registerButton: {
      display: "flex",
    },
    cardContent: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      color: "aliceblue",
      backgroundColor: "aliceblue",
    },
  })
);

export default function ListWithDogs() {
  //if enable is session storage is null, the form has just been opened
  // let isRegisterEnabled =
  //   sessionStorage.getItem("enable") === "false" ? false : true;
  // let isInputNotNull = sessionStorage.getItem("lostDogFields") != null;
  // const [registerEnabled, setRegisterEnabled] = useState(
  //   isRegisterEnabled as Boolean
  // );
  // const [lostDogFields, setLostDogFields] = useState<ILostDog>(
  //   !isRegisterEnabled && isInputNotNull
  //     ? JSON.parse(sessionStorage.getItem("lostDogFields") as string)
  //     : initLostDogProps
  // );
  // sessionStorage.setItem("lostDogFields", JSON.stringify(lostDogFields));
  // const [picture, setPicture] = useState<IPicture>(initPicture);

  // const inputsHandler = (e: { target: { name: any; value: any } }) => {
  //   let newField = { ...lostDogFields, [e.target.name]: e.target.value };
  //   setLostDogFields(newField);
  //   sessionStorage.setItem("inputField", JSON.stringify(newField));
  // };

  // function calendarHandler(date: MaterialUiPickersDate): void {
  //   let newField = { ...lostDogFields, dateLost: date as Date };
  //   setLostDogFields(newField);
  //   sessionStorage.setItem("inputField", JSON.stringify(newField));
  // }

  // const inputArrayHandler = (e: { target: { name: any; value: any } }) => {
  //   let newField = {
  //     ...lostDogFields,
  //     location: { ...lostDogFields.location, [e.target.name]: e.target.value },
  //   };
  //   setLostDogFields(newField);
  //   sessionStorage.setItem("inputField", JSON.stringify(newField));
  // };
  // const selectsHandler = (
  //   e: React.ChangeEvent<{ name?: string; value: unknown }>
  // ) => {
  //   let newField = {
  //     ...lostDogFields,
  //     [e.target.name as string]: e.target.value,
  //   };
  //   setLostDogFields(newField);
  //   sessionStorage.setItem("inputField", JSON.stringify(newField));
  // };

  // const canSave = true;
  // const classes = useStyles();

  // const [cookies, setCookie, removeCookie] = useCookies();

  // const onSavePostClicked = () => {
  //   try {
  //     registerDog(lostDogFields, picture);
  //   } catch (err) {
  //     console.error("Failed to save the dog: ", err);
  //   }
  // };

  // const onRegisterClick = () => {
  //   setLostDogFields(initLostDogProps);
  //   sessionStorage.setItem("inputField", JSON.stringify(initLostDogProps));
  //   sessionStorage.setItem("enable", "false");
  //   setRegisterEnabled(false);
  // };

  // function registerDog(dog: ILostDog, picture: IPicture) {
  //   store.dispatch(
  //     Actions.addDogThunk({
  //       dog: dog,
  //       picture: picture,
  //       cookies: cookies,
  //     })
  //   );
  // }

  // const handlePicturesChange = (event: any) => {
  //   if (event) {
  //     (event as File).arrayBuffer().then((fileBuffer) => {
  //       setPicture({
  //         id: 0,
  //         fileName: event.name, //event.name,
  //         fileType: event.type,
  //         data: fileBuffer,
  //       } as IPicture);
  //     });
  //   }
  // };

    return (
      <Grid>
      <Button
        data-testid="register-button"
        color="primary"
        variant="contained"
        size="large"
      >
        List with dogs
      </Button>
      </Grid>
    );
  }
