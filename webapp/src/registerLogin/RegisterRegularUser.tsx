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
import { registerRegularUserThunk } from "../app/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
      fontSize: "17px",
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

export default function RegisterRegularUser() {
  const classes = useStyles();
  const history = useHistory();
  const [cookies] = useCookies();
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
    store.dispatch(
      registerRegularUserThunk({
        username: values.username,
        password: values.password,
        email: values.email,
        phone: values.phone,
      })
    );
  };

  const goToLogin = () => {
    history.push("/");
  };

  function isStringValidPassword(password: string): boolean {
    return password.length <= 32 && password.length >= 6;
  }

  function isStringValidUsername(username: string): boolean {
    return username.length <= 32 && username.length >= 3;
  }

  function isStringValidPhoneNumeber(phone: string): boolean {
    let phoneNumberGarbage = new RegExp("[()\\s-]+", "g");
    let phoneNumber = new RegExp("^((\\+[1-9]?[0-9])|0)?[7-9]?[0-9]{9}$");
    if (phone === "") return false;
    phone = phone.replace(phoneNumberGarbage, "");
    return phoneNumber.test(phone);
  }

  function isStringValidEmail(email: string): boolean {
    //Should catch like 99%+ of valid emails
    // eslint-disable-next-line
    let emailRegex: RegExp = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
    return emailRegex.test(email);
  }

  useEffect(() => {
    if (cookies[config.cookies.userType] !== undefined) {
      history.push("/listDogs");
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
                  <Button
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
                    Register
                  </Button>
                </FormControl>
              </div>
            </div>
          </Card>
        </FormControl>
      </div>
      <div className="LowerText">Already have an account?</div>
      <div>
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
