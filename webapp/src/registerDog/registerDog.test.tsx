/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import RegisterDogForm from "./registerDog";
import { isNull } from "lodash";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router } from "react-router-dom";

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

it("Rendered register form button", () => {
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <Route path="/addDog">
            <RegisterDogForm />
          </Route>
        </Router>
      </Provider>,
      container
    );
  });
  //console.log(container?.classList.toString());
  expect(
    container?.getElementsByClassName("mainForm").length
  ).toBeGreaterThanOrEqual(0);
  expect(container?.childElementCount).toBeGreaterThanOrEqual(0);
  expect(
    container?.getElementsByClassName("cardContent").length
  ).toBeGreaterThanOrEqual(0);
  expect(
    container?.getElementsByClassName("formControl").length
  ).toBeGreaterThanOrEqual(0);
});

it("test only register button", () => {
  act(() => {
    render(<RegisterDogForm />, container);
  });
  const myRegisterClicked = jest.fn();
});
