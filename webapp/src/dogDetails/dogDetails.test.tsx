/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, createRenderer } from "react-dom/test-utils";
import DogDetails from "./dogDetails";
import { isNull } from "lodash";
import { Button } from "@material-ui/core";

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
    render(<DogDetails />, container);
  });
  expect(container?.getElementsByClassName("mainForm").length).toEqual(1);
  expect(
    container?.getElementsByClassName("classes.formControl").length
  ).toBeGreaterThanOrEqual(0);
});

it("test only register button", () => {
  act(() => {
    render(<DogDetails />, container);
  });
  const myRegisterClicked = jest.fn();
});
