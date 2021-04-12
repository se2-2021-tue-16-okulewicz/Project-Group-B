/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, createRenderer } from "react-dom/test-utils";
import ListWithDogs from "./settings";
import { isNull } from "lodash";
import { Button } from "@material-ui/core";
import { store } from "../app/store";
import { Provider } from "react-redux";

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
        <ListWithDogs />
      </Provider>,
      container
    );
  });
  expect(container?.getElementsByClassName("loader").length).toEqual(1);
});
