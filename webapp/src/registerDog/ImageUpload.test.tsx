/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ImageUpload from "./ImageUpload";
import { isNull } from "lodash";
import { fireEvent } from "@testing-library/dom";

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

it("Render upload image part of dog register", () => {
  act(() => {
    render(<ImageUpload />, container);
  })
  //fireEvent.change(input, {target:{value=""}});
  expect(container?.getElementsByClassName("imageContainer").length).toBe(1);
  expect(container?.getElementsByClassName("image").length).toBe(1);
  expect(container?.getElementsByClassName("imageInputLabel").length).toBe(1);
  expect(container?.getElementsByClassName("imageInput").length).toBe(1);
});
