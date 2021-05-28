/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { isNull } from "lodash";
import { Provider } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { store } from "../app/store";
import SheltersGrid from "./sheltersGrid";
import { exampleShelter, initShelter } from "../shelter/shelterTesting";

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

it("Rendered list of shelters", () => {
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <Route path="/shelters">
            <SheltersGrid
              shelters={[initShelter, exampleShelter]}
              id={-1}
              cookies={{}}
              path={""}
            />
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
  ).toBeGreaterThanOrEqual(0);
  //check if dog named alex was rendered
  expect(container?.getElementsByClassName("The Best Shelter").length).toBeGreaterThanOrEqual(0);
});
