import {
  Button,
  Card,
  CardHeader,
  createStyles,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
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
import {
  registerRegularUserThunk,
  registerShelterUserThunk,
} from "../app/actions";
import {
  isStringValidUsername,
  isStringValidEmail,
  isStringValidPhoneNumeber,
  isStringValidPassword,
  isStringValidPostCode,
  isStringValidNumber,
} from "../utilityComponents/validation";
import { IRegisterInfo, IShelterInfo } from "../utilityComponents/utilities";
import { initAddress } from "../shelter/shelterTesting";
import { IAddress } from "../shelter/shelterInterfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
      fontSize: "17px",
      marginBottom: "10%",
      justifyContent: "center",
      alignItems: "center",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(2),
    },
    textField: {
      width: "45ch",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    card: {
      backgroundColor: "aliceblue",
    },
  })
);

export default function RegisterShelterUser() {
  const classes = useStyles();
  const history = useHistory(); // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const [values, setValues] = useState<IShelterInfo>({
    name: "",
    address: initAddress,
    email: "",
    phoneNumber: "",
  });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange =
    (prop: keyof IShelterInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const addressHandler = (
    e: React.ChangeEvent<{ name?: string; value: any }>
  ) => {
    let newField = {
      ...values,
      address: {
        ...values.address,
        [e.target.name as string]: e.target.value,
      },
    };
    setValues(newField);
  };

  const onRegisterClicked = () => {
    //temporary before adding endpoint for fetching user's data
    store.dispatch(
      registerShelterUserThunk({
        name: values.name,
        address: values.address,
        email: values.email,
        phoneNumber: values.phoneNumber,
      })
    );
  };

  const goToLogin = () => {
    history.push("/");
  };

  useEffect(() => {
    if (cookies[config.cookies.userType] !== undefined) {
      history.push("/dogs");
    } // eslint-disable-next-line
  }, []);

  return (
    <div className="Register">
      <div className="Title">Lost Dogs and Shelters</div>
      <div>
        <FormControl className={classes.formControl}>
          <Card className={classes.card} variant="outlined">
            <CardHeader title="" />
            <div className="AccountListWrapper">
              <div>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  label="Name"
                  type={"text"}
                  value={values.name}
                  onChange={handleChange("name")}
                  error={!isStringValidUsername(values.name)}
                  helperText="Should have between 3 and 32 characters"
                />
              </div>
              <div>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  label="Street"
                  type={"text"}
                  value={values.address.street}
                  name="street"
                  onChange={addressHandler}
                  error={!isStringValidUsername(values.address.street)}
                  helperText="Should have between 3 and 32 characters"
                />
              </div>
              <div>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  label="Building Number"
                  type={"number"}
                  value={values.address.buildingNumber}
                  name="buildingNumber"
                  onChange={addressHandler}
                  error={!isStringValidNumber(values.address.buildingNumber)}
                  helperText="Should be a number"
                />
              </div>
              <div>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  label="Post Code"
                  type={"text"}
                  value={values.address.postCode}
                  name="postCode"
                  onChange={addressHandler}
                  error={!isStringValidPostCode(values.address.postCode)}
                  helperText="Should have between 3 and 10 characters"
                />
              </div>
              <div>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  label="City"
                  type={"text"}
                  value={values.address.city}
                  name="city"
                  onChange={addressHandler}
                  error={!isStringValidUsername(values.address.city)}
                  helperText="Should have between 3 and 32 characters"
                />
              </div>
              <div>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  label="Additional address line"
                  type={"text"}
                  value={values.address.additionalAddressLine}
                  name="additionalAddressLine"
                  onChange={addressHandler}
                  error={
                    !isStringValidUsername(
                      values.address.additionalAddressLine
                        ? values.address.additionalAddressLine
                        : "...."
                    )
                  }
                  helperText="Should have between 3 and 32 characters"
                />
              </div>
              <div>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  label="E-mail"
                  type={"text"}
                  value={values.email}
                  onChange={handleChange("email")}
                  error={!isStringValidEmail(values.email)}
                />
              </div>
              <div>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  label="Phone number"
                  type={"text"}
                  value={values.phoneNumber}
                  onChange={handleChange("phoneNumber")}
                  error={!isStringValidPhoneNumeber(values.phoneNumber)}
                />
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Button
                    data-testid="submit-button"
                    variant="contained"
                    onClick={() => onRegisterClicked()}
                    color="primary"
                    disabled={
                      !(
                        isStringValidEmail(values.email) &&
                        isStringValidUsername(values.name) &&
                        isStringValidPhoneNumeber(values.phoneNumber)
                      )
                    }
                  >
                    Register
                  </Button>
                </FormControl>
              </div>
            </div>
          </Card>
        </FormControl>
      </div>
      <div className="LowerText">Already have an account?</div>
      <div className="LowerText">
        <Link
          className={classes.root}
          component="button"
          onClick={() => goToLogin()}
          //color="inherit"
          variant="body2"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
