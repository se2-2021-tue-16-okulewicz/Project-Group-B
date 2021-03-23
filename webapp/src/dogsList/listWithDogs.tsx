import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
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
import { useHistory } from "react-router-dom";

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
      marginTop: "50vh"
    },
    cardContent: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      color: "aliceblue",
      backgroundColor: "aliceblue",
    },
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    Card:{
      minWidth:"30px",
      minHeight:"40px"
    },
    main: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      marginTop:"2vh"
    },
  }
  )
);

export default function ListWithDogs() {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies();

  const onRegisterClicked = () => {
    history.push("/addDog");
  }
  const classes = useStyles();
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
    <div className={classes.main}>
      <Button
        className={classes.registerButton}
        data-testid="register-button"
        color="primary"
        variant="contained"
        size="large"
        onClick={onRegisterClicked}
      >
        Register a Dog
      </Button>
      {/*<List className={classes.root}>
        {[0, 1, 2, 3, 4].map((sectionId) => (
          <li key={`section-${sectionId}`} className={classes.listSection}>
            <ul className={classes.ul}>
              {[0, 1, 2].map((item) => (
                <Card className={classes.Card}>
                  <CardHeader>
                    Item nr 
                  </CardHeader>
                </Card>
              ))}
            </ul>
          </li>
        ))}
              </List>*/}
    </div>
  );
}

