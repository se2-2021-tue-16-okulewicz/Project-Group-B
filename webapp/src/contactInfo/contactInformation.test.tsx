/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { isNull } from "lodash";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { Route, BrowserRouter as Router } from "react-router-dom";
import EditContactInfo from "./editContactInfo";

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

it("Test editing the contact information", () => {
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <Route path="/settings">
            <EditContactInfo />
          </Route>
        </Router>
      </Provider>,
      container
    );
  });

  expect(
    container?.getElementsByClassName("LowerText").length
  ).toBeGreaterThanOrEqual(0);

  expect(
    container?.getElementsByClassName("AccountListWrapper").length
  ).toBeGreaterThanOrEqual(0);

  expect(
    container?.getElementsByTagName("button").length
  ).toBeGreaterThanOrEqual(0);

  expect(
    container?.getElementsByClassName("MuiFormControl-root").length
  ).toBeGreaterThanOrEqual(0);
});
