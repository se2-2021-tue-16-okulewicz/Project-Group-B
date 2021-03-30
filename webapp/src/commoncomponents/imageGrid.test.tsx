/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, createRenderer } from "react-dom/test-utils";
import { isNull } from "lodash";
import { Button } from "@material-ui/core";
import imageGrid from "./imageGrid";

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

/*it("Rendered list of dogs", () => {
  act(() => {
    render(<imageGrid />, container);
  });
  //expect(container).toMatchSnapshot();
  //container?.getElementsByTagName("registerButton")
  expect(
    container?.getElementsByTagName("classes.registerButton").length
  ).toBeGreaterThanOrEqual(0);
  //main form is not rendered initially
});*/
