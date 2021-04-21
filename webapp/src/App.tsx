import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";
import { clearError, clearRedirect, logoutThunk } from "./app/actions";
import { State } from "./app/reducer";
import { store } from "./app/store";
import RegisterDogForm from "./registerDog/registerDog";
import Login from "./registerLogin/Login";
import ErrorDialog from "./utilityComponents/ErrorDialog";
import Footer from "./utilityComponents/Footer";
import LoadingPopup from "./utilityComponents/LoadingPopup";
import { useCookies } from "react-cookie";
import ListWithDogs from "./dogsList/listWithDogs";
import config from "./config/config";
import RegisterRegularUser from "./registerLogin/RegisterRegularUser";
import Settings from "./settings/settings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      marginTop: "2vh",
    },
  })
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  );
}

function Layout() {
  const error = useSelector((state: State) => state.error);
  const loading = useSelector((state: State) => state.loading);
  const redirect = useSelector((state: State) => state.redirect);
  const history = useHistory();
  const classes = useStyles();
  const [cookies, removeCookie] = useCookies();

  useEffect(() => {
    if (redirect !== null) {
      history.push(redirect);
      store.dispatch(clearRedirect());
    } // eslint-disable-next-line
  }, [redirect]);

  const errorOnClose = () => {
    if (error.errorCode === 403) {
      //We can reach this point after logout from footer and it crashes the app
      //So we wat to if logout if user is already logged out
      if (cookies[config.cookies.userType] !== undefined) {
        removeCookie(config.cookies.token, { path: "/" });
        removeCookie(config.cookies.userType, { path: "/" });
        removeCookie(config.cookies.userId, { path: "/" });
        store.dispatch(logoutThunk(cookies));
        history.push("/");
      }
    }
    store.dispatch(clearError());
  };

  return (
    <div className={classes.mainContainer}>
      {ErrorDialog(
        error.hasError,
        errorOnClose,
        "Error has occured",
        error.erorMessage,
        "OK"
      )}
      {loading && <LoadingPopup />}
      <Switch>
        <Route exact path="/">
          <Login />
          <Footer />
        </Route>
        <Route path="/register/user">
          <RegisterRegularUser />
          <Footer />
        </Route>
        <Route path="/listDogs">
          <ListWithDogs />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/addDog">
          <RegisterDogForm />
          <Footer />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
