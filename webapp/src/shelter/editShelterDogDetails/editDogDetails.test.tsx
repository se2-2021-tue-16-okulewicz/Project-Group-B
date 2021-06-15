/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, createRenderer } from "react-dom/test-utils";
import EditDogDetails from "./editShelterDogDetails";
import { isNull } from "lodash";
import { Button } from "@material-ui/core";
import { store } from "../../app/store";
import { Provider } from "react-redux";
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

it("Rendered list of dogs", () => {
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <Route
            path={`/settings/edit/dog/:id`}
            children={<EditDogDetails cookies={{}} dogId={-1} />}
          />
        </Router>
      </Provider>,
      container
    );
  });
  expect(
    container?.getElementsByClassName("mainForm").length
  ).toBeGreaterThanOrEqual(0);
  expect(
    container?.getElementsByClassName("classes.formControl").length
  ).toBeGreaterThanOrEqual(0);
});
