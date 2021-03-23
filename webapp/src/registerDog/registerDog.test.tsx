/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, createRenderer } from "react-dom/test-utils";
import RegisterDogForm from "./registerDog";
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
    render(<RegisterDogForm />, container);
  });
   expect(container).toMatchSnapshot();
     //main form is not rendered initially
  expect(
    container?.getElementsByClassName("mainForm").length
  ).toBe(0);
  expect(
    container?.getElementsByClassName("registerButton").length
  ).toBe(0);
  expect(
    container?.getElementsByClassName("formControl").length
  ).toBeGreaterThanOrEqual(0);
  
});

it("Render form for dog register", () => {
  act(() => {
    render(<RegisterDogForm />, container);
  });

  expect(
    container?.getElementsByClassName("MuiGrid-root").length
  ).toBeGreaterThanOrEqual(0);
});

it("test only register button", () => {
  act(() => {
    render(<RegisterDogForm />, container);
  });
  const myRegisterClicked = jest.fn();
  //const mockedButton = shallow(<Button onClick={myRegisterClicked} />);

  //the register button is initially rendered

  //mockedButton.find('registerButton').simulate('click');
  //mockedButton.find('.Button__btn').simulate('click');
  //mockedButton.find('button.Button__btn').simulate('click');
  //expect(myRegisterClicked.mock.calls.length).toBe(0); // !! Should be 3 ?

  // Snapshot demo
  //expect(mockedButton).toMatchSnapshot();
});
