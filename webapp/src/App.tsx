import { makeStyles, Theme, createStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Provider, useSelector } from "react-redux";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";
import { clearRedirect, logoutThunk, clearError } from "./app/actions";
import { State } from "./app/stateInterfaces";
import { store } from "./app/store";
import config from "./config/config";
import EditContactInfo from "./contactInfo/EditContactInfo";
import DogDetails from "./dog/dogDetails/dogDetails";
import ListWithDogs from "./dog/dogsList/listWithDogs";
import EditDogDetails from "./dog/editDogDetails/editDogDetails";
import RegisterDogForm from "./dog/registerDog/registerDog";
import Settings from "./dog/settings/settings";
import Login from "./registerLogin/Login";
import RegisterRegularUser from "./registerLogin/RegisterRegularUser";
import RegisterShelterUser from "./registerLogin/RegisterShelterUser";
import { AdoptDogDetails } from "./shelter/adoptDogDetails/adoptDogDetails";
import ListWithAdoptDogs from "./shelter/adoptDogList/listWithAdoptDogs";
import RegisterShelterDogForm from "./shelter/registerShelterDog/registerShelterDog";
import ShelterListWithDogs from "./shelter/shelterDogsList/shelterListWithDogs";
import ListWithShelters from "./shelter/sheltersList/listWithShelters";
import ErrorDialog from "./utilityComponents/ErrorDialog";
import Footer from "./utilityComponents/Footer";
import LoadingPopup from "./utilityComponents/LoadingPopup";

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
  const redirect = useSelector((state: State) => state.redirect);// eslint-disable-next-line
  const [dogId, setDogId] = useState(0);
  const history = useHistory();
  const classes = useStyles(); // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    if (redirect !== null) {
      history.push(redirect);
      store.dispatch(clearRedirect());
    } // eslint-disable-next-line
  }, [redirect]);

  function redirectToDogDetailsOrEdit(id: number) {
    history.push(`/edit/${id}`);
  }

  function redirectToDogDetails(id: number) {
    history.push(`/dog/${id}`);
  }

  function redirectToShelterDetails(id: number) {
    history.push(`/shelter/${id}`);
  }

  const errorOnClose = () => {
    //We can reach this point after logout from footer and it crashes the app
    if (error.errorCode === 401) {
      //So we wat to if logout if user is already logged out
      if (cookies[config.cookies.userType] !== undefined) {
        removeCookie(config.cookies.token, { path: "/" });
        removeCookie(config.cookies.userType, { path: "/" });
        removeCookie(config.cookies.userId, { path: "/" });
        store.dispatch(logoutThunk(cookies));
      }
      history.push("/");
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
        <Route path="/register/shelter">
          <RegisterShelterUser />
          <Footer />
        </Route>
        <Route path="/info/edit">
          <EditContactInfo />
          <Footer />
        </Route>
        <Route path="/shelterdogs">
          <ShelterListWithDogs
            redirectToDogDetailsOrEdit={(id: number) =>
              redirectToDogDetails(id)
            }
          />
        </Route>
        <Route path="/dogs">
          <ListWithDogs
            redirectToDogDetailsOrEdit={(id: number) =>
              redirectToDogDetails(id)
            }
          />
        </Route>
        <Route path="/shelters">
          <ListWithShelters
            redirectToShelterDetails={(id: number) =>
              redirectToShelterDetails(id)
            }
          />
        </Route>
        <Route path="/settings">
          <Settings
            redirectToDogDetailsOrEdit={(id: number) =>
              redirectToDogDetailsOrEdit(id)
            }
          />
        </Route>
        <Route path={`/shelter/:shelterid`}>
          <ListWithAdoptDogs />
        </Route>
        <Route path={`/adoptdogs/:shelterId/dogs/:dogId`}>
          <AdoptDogDetails />
          <Footer />
        </Route>
        <Route path="/addDog">
          <RegisterDogForm />
          <Footer />
        </Route>
        <Route path="/addShelterDog">
          <RegisterShelterDogForm />
          <Footer />
        </Route>
        <Route path={`/edit/:id`}>
          <EditDogDetails dogId={dogId} />
          <Footer />
        </Route>
        <Route path={`/dog/:id`}>
          <DogDetails />
          <Footer />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
