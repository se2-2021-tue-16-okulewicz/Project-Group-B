/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { isNull } from "lodash";
import LostDogsGrid from "./lostDogsGrid";
import { testDogList, testLostDogList } from "../../dog/dogTesting";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { store } from "../../app/store";

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

it("Rendered list of dog cards", () => {
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <Route path="/">
            <LostDogsGrid
              dogs={testLostDogList}
              id={-1}
              cookies={{}}
              path={""}
            />
          </Route>
        </Router>
      </Provider>,
      container
    );
  });
  //expect(container).toMatchSnapshot();
  //container?.getElementsByTagName("registerButton")
  expect(
    container?.getElementsByClassName("tile").length
  ).toBeGreaterThanOrEqual(testLostDogList.length);
  //check if dog named alex was rendered
  expect(container?.getElementsByClassName("Alex").length).toEqual(1);
});
