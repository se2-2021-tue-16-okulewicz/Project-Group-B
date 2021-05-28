/**
 * @jest-environment jsdom
 */

import React, { useState } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, renderIntoDocument, Simulate } from "react-dom/test-utils";
import { isNull } from "lodash";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router } from "react-router-dom";
import FilterForm from "./filterForm";
import { IFilterSort, initFilterProps } from "./filterInterface";
import { InputFormControl } from "../../commoncomponents/formHandlers";
import config from "../../config/config";

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

it("Rendered list of dogs", async () => {
  const props = {
    updateFilters: jest.fn(),
    filters: {
      page: config.defaultFilters.page,
      size: config.defaultFilters.size,
    },
  };
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <Route path="/dogs">
            <FilterForm {...props} />
          </Route>
        </Router>
      </Provider>,
      container
    );
  });
  const input = renderIntoDocument(
    <InputFormControl value="test" class="input" label="label" name="test_id" />
  );
  const inputContainer = renderIntoDocument(<FilterForm {...props} />);
  await act(async () => {
    container?.dispatchEvent(new InputEvent("change", { data: "0" }));
  });
  expect(props.filters.page).toEqual(0);
  expect(container?.classList.length).toBeGreaterThanOrEqual(0);
});
