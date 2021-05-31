/**
 * @jest-environment jsdom
 */

import React from "react";
import ReactDOM, { render, unmountComponentAtNode } from "react-dom";
import {
  act,
  createRenderer,
  renderIntoDocument,
  Simulate,
} from "react-dom/test-utils";
import { isNull } from "lodash";
import { Button, TextField } from "@material-ui/core";
import ImageGrid from "./grids/imageGrid";
import { testDogList } from "../dog/dogTesting";
import { Provider } from "react-redux";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";
import { store } from "../app/store";
import {
  DateFormControl,
  InputFormControl,
  SelectFormControl,
} from "./formHandlers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { OrderTypes } from "../dog/dogEnums";

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

it("Rendered input form", () => {
  act(() => {
    render(
      <InputFormControl
        value="test"
        class="input"
        label="label"
        name="test_id"
      />,
      container
    );
  });
  ///check if form control was rendered
  expect(container?.getElementsByClassName("input").length).toEqual(1);
  //check if textfield was rendered
  expect(container?.getElementsByClassName("test_id").length).toEqual(1);
});

it("Rendered select form", async () => {
  act(() => {
    render(
      <SelectFormControl
        value={OrderTypes.DESC}
        class="input"
        label="label"
        name="test_id"
        options={OrderTypes}
      />,
      container
    );
  });
  const values = {
    onChange: jest.fn(),
    value: OrderTypes.DESC,
  };
  ///check if form control was rendered
  expect(container?.getElementsByClassName("input").length).toEqual(1);
  //check if textfield was rendered
  expect(container?.getElementsByClassName("test_id").length).toEqual(1);
  const component = container?.querySelector("test_id");
  await act(async () => {
    component?.dispatchEvent(
      new InputEvent("change", { data: OrderTypes.ASC })
    );
  });
  expect(values.value).toEqual(OrderTypes.DESC);
});

it("Rendered date form", () => {
  act(() => {
    render(
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateFormControl
          value={new Date()}
          class="input"
          label="label"
          name="test_id"
        />
      </MuiPickersUtilsProvider>,
      container
    );
  });
  ///check if form control was rendered
  expect(container?.getElementsByClassName("input").length).toEqual(1);
  //check if date picker was rendered
  expect(container?.getElementsByClassName("test_id").item.name).toEqual(
    "item"
  );
});

/*it("Rendered input", done => {
      render(<InputFormControl value="test" class="input" label="label" name="test_id"/>,container
      );
      //const input = container?.getElementsByClassName("input");
      //const inputContainer = renderIntoDocument(<TextField value="test" label="label" name="test_id"/>);
      //const input = ReactDOM.findDOMNode(inputContainer);
      //expect(input?.item.call(focus, 0)?.nodeValue).toEqual("");
      //Simulate.change(inputContainer, {target:{value:"test"}});
      //expect(input?.item.apply
      
      done();
 
  });*/
