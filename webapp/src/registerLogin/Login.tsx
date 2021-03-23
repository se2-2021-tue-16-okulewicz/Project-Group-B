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
import clsx from "clsx";
import "date-fns";
import React, { useState } from "react";
import "./Login.css";
import { ILoginInformation } from "./loginRegisterInterfaces";

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

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

export default function Login() {
  const classes = useStyles();
  const [values, setValues] = useState<State>({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onLoginClicked = () => {};
  const goToUserRegister = () => {};
  const goToShelterRegister = () => {};

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
                <FormControl className={classes.formControl}>
                  <Button
                    data-testid="submit-button"
                    variant="contained"
                    onClick={() => onLoginClicked()}
                    color="primary"
                    disabled={
                      values.username.length === 0 &&
                      values.password.length === 0
                    }
                  >
                    Login
                  </Button>
                </FormControl>
              </div>
            </div>
          </Card>
        </FormControl>
      </div>
      <div className="LowerText">Do not have an account?</div>
      <div>
        <Link
          className={classes.root}
          component="button"
          onClick={() => goToUserRegister()}
          //color="inherit"
          variant="body2"
        >
          Create an account
        </Link>
      </div>
      <div className="LowerText">Want to regster new shelter?</div>
      <div>
        <Link
          className={classes.root}
          component="button"
          onClick={() => goToShelterRegister()}
          //color="inherit"
          variant="body2"
        >
          Create new shelter
        </Link>
      </div>
    </div>
  );
}