/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { render, unmountComponentAtNode } from "react-dom";
 import { act, createRenderer } from "react-dom/test-utils";
 import { isNull } from "lodash";
 import { Button } from "@material-ui/core";
 import ImageGrid from "./imageGrid";
 import {testDogList} from "../dog/dogTesting";
 
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
 
 it("Rendered list of gridlistitems", () => {
   act(() => {
     render(<ImageGrid dogs={testDogList}/>, container);
   });
   //expect(container).toMatchSnapshot();
   //container?.getElementsByTagName("registerButton")
   expect(
     container?.getElementsByClassName("tile").length
   ).toEqual(testDogList.length);
 
   expect(
     container?.getElementsByClassName("Alex").length
     ).toEqual(1);
 });
 
