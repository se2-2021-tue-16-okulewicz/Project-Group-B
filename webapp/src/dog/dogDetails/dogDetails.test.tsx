/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, createRenderer } from "react-dom/test-utils";
import DogDetails from "./dogDetails";
import { isNull } from "lodash";
import { Button } from "@material-ui/core";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, useHistory } from "react-router-dom";

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
          <Route path={`/dog/0`} children={<DogDetails dogId={0} />} />
        </Router>
      </Provider>,
      container
    );
  });
  expect(
    container?.getElementsByClassName("grid").length
  ).toBeGreaterThanOrEqual(0);
  expect(
    container?.getElementsByClassName("classes.formControl").length
  ).toBeGreaterThanOrEqual(0);
});
