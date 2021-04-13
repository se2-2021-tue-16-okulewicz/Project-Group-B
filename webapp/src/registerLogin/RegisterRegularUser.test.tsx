/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import RegisterRegularUser from "./RegisterRegularUser";
import { isNull } from "lodash";
import { Provider } from "react-redux";
import { store } from "../app/store";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";

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

it("Test register regular user view elements", () => {
  act(() => {
    render(
      <Provider store={store}>
             <Router>
             <Route path="/register/user">
          <RegisterRegularUser />
        </Route>
      </Router>
      </Provider>,
      container
    );
  });

  expect(container?.getElementsByClassName("LowerText").length).toBeGreaterThanOrEqual(0);

  expect(container?.getElementsByClassName("AccountListWrapper").length).toBeGreaterThanOrEqual(
    0
  );

  expect(container?.getElementsByTagName("button").length).toBeGreaterThanOrEqual(0);

  expect(container?.getElementsByClassName("MuiFormControl-root").length).toBeGreaterThanOrEqual(0);
});
