import React from "react";
import { Provider, useSelector } from "react-redux";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";
import { clearError } from "./app/actions";
import { State } from "./app/reducer";
import { store } from "./app/store";
import RegisterDogForm from "./registerDog/registerDog";
import Login from "./registerLogin/Login";
import ErrorDialog from "./utilityComponents/ErrorDialog";
import Footer from "./utilityComponents/Footer";
import LoadingPopup from "./utilityComponents/LoadingPopup";
import "./App.css";
import { useCookies } from "react-cookie";

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
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies();

  const errorOnClose = () => {
    if (error.errorCode === 403) {
      removeCookie("token", { path: "/" });
      removeCookie("userType", { path: "/" });
      history.push("/");
    }
    store.dispatch(clearError());
  };

  return (
    <div className="App">
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
        </Route>
        <Route path="/addDog">
          <RegisterDogForm />
        </Route>
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
