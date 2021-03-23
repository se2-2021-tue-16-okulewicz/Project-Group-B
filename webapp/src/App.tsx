import React from "react";
import { Provider } from "react-redux";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { store } from "./app/store";
import RegisterDogForm from "./registerDog/registerDog";
import Login from "./registerLogin/Login";
import Footer from "./utilityComponents/Footer";

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

function Layout() {
  return (
    <div className="App">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
