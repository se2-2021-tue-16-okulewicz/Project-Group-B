/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, createRenderer } from "react-dom/test-utils";
import { isNull } from "lodash";
import { Button } from "@material-ui/core";
import ShelterDogGrid from "./shelterDogGrid";
import { otherDog, sheltertestDog, testDogList } from "../../dog/dogTesting";
import { Provider } from "react-redux";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";
import { store } from "../../app/store";

let container: HTMLDivElement | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if (!isNull(container)) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

it("Rendered list of dog cards", () => {
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <Route path="/">
            <ShelterDogGrid dogs={testDogList} id={-1} cookies={{}} path={""} />
          </Route>
        </Router>
      </Provider>,
      container
    );
  });
  //expect(container).toMatchSnapshot();
  //container?.getElementsByTagName("registerButton")
  expect(
    container?.getElementsByClassName("tile").length
  ).toBeGreaterThanOrEqual(testDogList.length);
  //check if dog named alex was rendered
  expect(container?.getElementsByClassName("Alex").length).toEqual(1);
  expect(container?.getElementsByClassName("Alexa").length).toEqual(1);
});
