/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { isNull } from "lodash";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import ShelterListWithDogs from "./shelterListWithDogs";

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

it("Rendered list of dogs", () => {
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <Route path="/shelterdogs">
            <ShelterListWithDogs />
          </Route>
        </Router>
      </Provider>,
      container
    );
  });
  expect(
    container?.getElementsByClassName("loader").length
  ).toBeGreaterThanOrEqual(0);
});
