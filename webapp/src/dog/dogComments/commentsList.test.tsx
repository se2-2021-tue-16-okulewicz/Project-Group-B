/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { render, unmountComponentAtNode } from "react-dom";
 import { act } from "react-dom/test-utils";
 import { isNull } from "lodash";
 import { store } from "../../app/store";
 import { Provider } from "react-redux";
 import { Route, BrowserRouter as Router } from "react-router-dom";
import { initComment } from "./commentsClasses";
import CommentsList from "./commentsList";
 
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
     render(
       <Provider store={store}>
         <Router>
           <Route path={`/`} children={<CommentsList comments={[initComment]} />} />
         </Router>
       </Provider>,
       container
     );
   });
   expect(
     container?.getElementsByClassName("grid").length
   ).toBeGreaterThanOrEqual(0);
   expect(
     container?.getElementsByClassName("classes.formControl").length
   ).toBeGreaterThanOrEqual(0);
 });
 