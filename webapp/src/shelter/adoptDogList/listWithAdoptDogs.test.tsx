/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Settings from "./listWithAdoptDogs";
import { isNull } from "lodash";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router } from "react-router-dom";
import ListWithAdoptDogs from "./listWithAdoptDogs";

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
          <Route path="/shelter/1">
            <ListWithAdoptDogs />
          </Route>
        </Router>
      </Provider>,
      container
    );
  });
  expect(container?.getElementsByClassName("loader").length).toEqual(0);
  expect(container?.getElementsByClassName("menuItem").length).toEqual(0);
  expect(container?.getAttributeNames().length).toEqual(0);
});
