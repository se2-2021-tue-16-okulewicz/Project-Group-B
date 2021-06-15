import {
  Button,
  Card,
  CardHeader,
  createStyles,
  FormControl,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { IContactInfo } from "./contactInfoInterface";
import { store } from "../app/store";
import config from "../config/config";
import * as Actions from "../app/actions";
import { State } from "../app/stateInterfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainForm: {
      display: "flex",
      flexWrap: "wrap",
      alignSelf: "center",
      marginTop: "10%",
      marginLeft: "10%",
      marginRight: "10%",
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

export default function ContactInfo(props: any) {
  const classes = useStyles();
  const history = useHistory(); // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();
  const values = useSelector(
    (state: State) => state.contactInfo as IContactInfo
  );
  const [pageRefresh, setPageRefresh] = useState(true);

  const onEditClicked = () => {
    history.push("/info/edit");
  };

  useEffect(() => {
    if (pageRefresh) {
      store.dispatch(
        Actions.fetchContactInfoThunk({
          userId: cookies[config.cookies.userId],
          cookies: cookies,
        })
      );
      setPageRefresh(false); // eslint-disable-next-line
    } // eslint-disable-next-line
  }, [pageRefresh]);

  return (
    <FormControl className={classes.mainForm}>
      {values != null && (
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
      )}
    </FormControl>
  );
}
