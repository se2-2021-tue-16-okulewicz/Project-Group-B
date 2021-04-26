import {
  Button,
  Card,
  CardHeader,
  createStyles,
  FormControl,
  FormHelperText,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { store } from "../app/store";
import config from "../config/config";
import { useCookies } from "react-cookie";
import {
  isStringValidUsername,
  isStringValidEmail,
  isStringValidPhoneNumeber,
  isInvalidContactInfo,
} from "../utilityComponents/validation";
import { useSelector } from "react-redux";
import { State } from "../app/reducer";
import {
  ErrorInfos,
  IContactInfo,
  initErrorInfo,
} from "./contactInfoInterfaces";
import * as Actions from "../app/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainForm: {
      display: "flex",
      flexWrap: "wrap",
      alignSelf: "center",
      verticalAlign: "center",
      marginLeft: "10%",
      marginRight: "10%",
      marginTop: "7%",
    },
    margin: {
      margin: theme.spacing(3),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "45ch",
      fontSize: "20px",
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

export default function EditContactInfo() {
  const classes = useStyles();
  const history = useHistory(); // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const contactInfo = useSelector((state: State) => state.contactInfo);
  const errorMessage = useSelector((state: State) => state.error.erorMessage);
  const [displayMsg, setDisplayMsg] = useState("");
  const [pageRefresh, setPageRefresh] = useState(true);
  const [isError, setIsError] = useState<ErrorInfos>(initErrorInfo);
  const [values, setValues] = useState<IContactInfo>({
    name: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (pageRefresh) {
      store.dispatch(
        Actions.fetchContactInfoThunk({
          userId: cookies[config.cookies.userId],
          cookies: cookies,
        })
      );
      setPageRefresh(false); // eslint-disable-next-line
    }
  }, [pageRefresh]);

  useEffect(() => {
    if (contactInfo && !isError.total && !pageRefresh) {
      setValues(contactInfo);
      setDisplayMsg("");
    } // eslint-disable-next-line
  }, [contactInfo]);

  useEffect(() => {
    if (errorMessage !== "") {
      setDisplayMsg(errorMessage);
    } // eslint-disable-next-line
  }, [errorMessage]);

  const handleChange = (prop: keyof IContactInfo) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let tmp = { ...values, [prop]: event.target.value };
    setValues(tmp);
    setIsError(isInvalidContactInfo(tmp));
  };

  const onSubmitClicked = () => {
    try {
      store.dispatch(
        Actions.updateContactInfoThunk({
          userId: cookies[config.cookies.userId],
          contactInfo: values as IContactInfo,
          cookies: cookies,
        })
      );
    } catch (err) {
      console.error("Failed to fetch the dogs: ", err);
    } finally {
      if (!isError.total && displayMsg === "") {
        history.push("/settings");
        //history.go(0);
      }
    }
  };

  const onCancelClicked = () => {
    history.push("/settings");
  };

  return (
    <FormControl className={classes.mainForm}>
      <Card className={classes.card} variant="outlined">
        <CardHeader title="" />
        {!pageRefresh && (
          <div className="AccountListWrapper">
            {displayMsg && isError && (
              <div>
                <FormHelperText
                  style={{
                    color: "gray",
                    fontSize: "13px",
                    fontStyle: "italic",
                  }}
                >
                  {displayMsg}
                </FormHelperText>
              </div>
            )}
            <div>
              <TextField
                className={clsx(classes.margin, classes.textField)}
                label="Username"
                type={"text"}
                value={values.name}
                onChange={handleChange("name")}
                error={!isStringValidUsername(values.name)}
                helperText={
                  isError.name && isError.total
                    ? "Should have between 3 and 32 characters"
                    : ""
                }
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
                helperText={
                  isError.email && isError.total
                    ? "There are some invalid characters"
                    : ""
                }
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
                helperText={
                  isError.phoneNumber && isError.total
                    ? "There are some invalid characters"
                    : ""
                }
              />
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Grid
                  container
                  spacing={2}
                  style={{ alignContent: "space-evenly", alignSelf: "stretch" }}
                >
                  <Grid item>
                    <Button
                      className="save"
                      variant="contained"
                      onClick={() => onSubmitClicked()}
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      className="cancel"
                      variant="contained"
                      onClick={() => onCancelClicked()}
                      color="primary"
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </div>
          </div>
        )}
      </Card>
    </FormControl>
  );
}
