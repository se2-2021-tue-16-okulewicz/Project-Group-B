import {
  Button,
  Card,
  CardHeader,
  createStyles,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React from "react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { store } from "../app/store";
import config from "../config/config";
import { useCookies } from "react-cookie";
import { fetchContactInfoThunk } from "../app/actions";
import { isStringValidUsername, isStringValidEmail, isStringValidPhoneNumeber, isStringValidPassword } from "../utilityComponents/validation";
import { useSelector } from "react-redux";
import { State } from "../app/reducer";
import { internalState } from "../utilityComponents/utilities";
import { IContactInfo } from "./contactInfoInterfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainForm: {
      display: "flex",
      flexWrap: "wrap",
      alignSelf:"center",
      marginTop: "10%",
      marginLeft:"10%",
      marginRight:"10%",
    },
    margin: {
      margin: theme.spacing(3),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "45ch",
      fontSize:"20px"
    },
    formControl: {
      margin: theme.spacing(3),
      minWidth: 120,
    },
    card: {
      backgroundColor: "aliceblue",
    },
  })
);

export default function ContactInfo(props:any) {
  const classes = useStyles();
  const history = useHistory(); // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const values = useSelector((state: State) => state.contactInfo as IContactInfo);

  const onEditClicked = () => {
    history.push("/info/edit");
  };


  return (
        <FormControl className={classes.mainForm}>
          <Card className={classes.card} variant="outlined">
            <CardHeader title="" />
            <div className="AccountListWrapper">
              <div>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  label="Name"
                  type={"text"}
                  value={values.name}
                  disabled
                />
              </div>
              <div>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  label="E-mail"
                  type={"text"}
                  value={values.email}
                  disabled
                />
              </div>
              <div>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  label="Phone number"
                  type={"text"}
                  value={values.phoneNumber}
                  disabled
                />
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Button
                  className="edit"
                    variant="contained"
                    onClick={() => onEditClicked()}
                    color="primary"
                  >
                    Edit
                  </Button>
                </FormControl>
              </div>
            </div>
          </Card>
        </FormControl>
  );
}
