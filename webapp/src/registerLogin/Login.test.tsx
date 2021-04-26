/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Login from "./Login";
import { isNull } from "lodash";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { reducer, init } from "../app/reducer";
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

it("Test login view elements", () => {
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <Route exact path="/">
            <Login />
          </Route>
        </Router>
      </Provider>,
      container
    );
  });

  expect(container?.getElementsByClassName("LowerText").length).toBe(2);

  expect(container?.getElementsByClassName("AccountListWrapper").length).toBe(
    1
  );

  expect(container?.getElementsByTagName("button").length).toBe(4);
});

describe("reducer", () => {
  it("should return initial state", () => {
    const state = reducer(init, { type: "" });
    expect(state).toEqual({
      contactInfo: null,
      dogs: [],
      dogsLastPage: false,
      dogsRequireRefresh: true,
      editedDog: null,
      loading: false,
      error: {
        hasError: false,
        errorCode: 0,
        erorMessage: "",
      },
      loginInformation: null,
      pages: 0,
      redirect: null,
      settingsRequireRefresh: false,
    });
  });
});
