import {
  Button,
  Card,
  CardHeader,
  createStyles,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  makeStyles,
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

export default function Register() {
  const classes = useStyles();
  const history = useHistory();
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
    //store.dispatch(
    //);
  };

  const goToLogin = () => {
    history.push("/");
  };

  useEffect(() => {
    if (cookies[config.cookies.userType] !== undefined) {
      history.push("/listDogs");
    }
  }, []);

  return (
    <div className="Login">
      <div className="Title">Lost Dogs and Shelters</div>
      <div>
        <FormControl className={classes.formControl}>
          <Card className={classes.card} variant="outlined">
            <CardHeader title="" />
            <div className="AccountListWrapper">
              <div>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    type={"text"}
                    value={values.username}
                    onChange={handleChange("username")}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="email">E-mail</InputLabel>
                  <Input
                    id="email"
                    type={"text"}
                    value={values.email}
                    onChange={handleChange("email")}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="phone">Phone number</InputLabel>
                  <Input
                    id="phone"
                    type={"text"}
                    value={values.phone}
                    onChange={handleChange("phone")}
                  />
                </FormControl>
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
                </FormControl>
              </div>
              <div>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
                  <InputLabel htmlFor="repeatPassword">Repeat password</InputLabel>
                  <Input
                    id="repeatPassword"
                    type={values.showRepeatedPassword ? "text" : "password"}
                    value={values.repeatedPassword}
                    onChange={handleChange("repeatedPassword")}
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
                      values.username.length === 0 &&
                      values.password.length === 0
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
