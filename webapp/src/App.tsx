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
  const history = useHistory();

  const errorOnClose = () => {
    if (error.errorCode === 403) {
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
