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
import { registerRegularUserThunk } from "../app/actions";
import { isStringValidUsername, isStringValidEmail, isStringValidPhoneNumeber, isStringValidPassword } from "../utilityComponents/validation";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainForm: {
      display: "flex",
      flexWrap: "wrap",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
      alignSelf:"center",
      margin: "5%",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
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

interface internalState {
  username: string;
  email: string;
  phone: string;
  password: string;
  repeatedPassword: string;
  showPassword: boolean;
  showRepeatedPassword: boolean;
}

export default function EditContactInfo() {
  const classes = useStyles();
  const history = useHistory(); // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const [values, setValues] = useState<internalState>({
    username: "",
    email: "",
    phone: "",
    password: "",
    repeatedPassword: "",
    showPassword: false,
    showRepeatedPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowRepeatedPassword = () => {
    setValues({
      ...values,
      showRepeatedPassword: !values.showRepeatedPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (prop: keyof internalState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onRegisterClicked = () => {
    //temporary before adding endpoint for fetching user's data
    /*store.dispatch(
        updateContactInfo({
        username: values.username,
        password: values.password,
        email: values.email,
        phone: values.phone,
      })
    );*/
  };

  const onCancelClicked = () => {
  };


  const goToLogin = () => {
    history.push("/");
  };

  return (
        <FormControl className={classes.mainForm}>
          <Card className={classes.card} variant="outlined">
            <CardHeader title="" />
            <div className="AccountListWrapper">
              <div>
                <TextField
                  className={clsx(classes.margin, classes.textField)}
                  label="Username"
                  type={"text"}
                  value={values.username}
                  onChange={handleChange("username")}
                  error={!isStringValidUsername(values.username)}
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
                  value={values.phone}
                  onChange={handleChange("phone")}
                  error={!isStringValidPhoneNumeber(values.phone)}
                />
              </div>
              <div>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    error={!isStringValidPassword(values.password)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText
                    error={!isStringValidPassword(values.password)}
                  >
                    Should have between 6 and 32 characters
                  </FormHelperText>
                </FormControl>
              </div>
              <div>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="repeatPassword">
                    Repeat password
                  </InputLabel>
                  <Input
                    id="repeatPassword"
                    type={values.showRepeatedPassword ? "text" : "password"}
                    value={values.repeatedPassword}
                    onChange={handleChange("repeatedPassword")}
                    error={!(values.password === values.repeatedPassword)}
                    aria-describedby="repeatedPasswordHelper"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowRepeatedPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showRepeatedPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText
                    error={!(values.password === values.repeatedPassword)}
                  >
                    Must be the same as password
                  </FormHelperText>
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Grid container spacing={2} style={{alignContent:"space-evenly", alignSelf:"stretch"}}>
                  <Button
                    className="save"
                    data-testid="submit-button"
                    variant="contained"
                    onClick={() => onRegisterClicked()}
                    color="primary"
                    disabled={
                      !(
                        isStringValidEmail(values.email) &&
                        isStringValidUsername(values.username) &&
                        isStringValidPhoneNumeber(values.phone) &&
                        isStringValidPassword(values.password) &&
                        values.password === values.repeatedPassword
                      )
                    }
                  >
                    Save
                  </Button>
                  <Button
                    data-testid="submit-button"
                    variant="contained"
                    onClick={() => onCancelClicked()}
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    data-testid="submit-button"
                    variant="contained"
                    onClick={() => onCancelClicked()}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  </Grid>
                </FormControl>
              
              </div>
            </div>
          </Card>
        </FormControl>
  );
}
