/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { render, unmountComponentAtNode } from "react-dom";
 import { act } from "react-dom/test-utils";
 import RegisterRegularUser from "./RegisterRegularUser";
 import { isNull } from "lodash";
 import { Provider } from "react-redux";
 import { store } from "../app/store";
 
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
 
 it("Test register regular user view elements", () => {
   act(() => {
     render(
       <Provider store={store}>
         <RegisterRegularUser />
       </Provider>,
       container
     );
   });
 
   expect(container?.getElementsByClassName("LowerText").length).toBe(1);
 
   expect(container?.getElementsByClassName("AccountListWrapper").length).toBe(
     1
   );
 
   expect(container?.getElementsByTagName("button").length).toBe(4);

   expect(container?.getElementsByClassName("MuiFormControl-root").length).toBe(7);
 });