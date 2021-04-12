/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, createRenderer } from "react-dom/test-utils";
import { isNull } from "lodash";
import { Button } from "@material-ui/core";
import imageGrid from "../commoncomponents/imageGrid";

//import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './actions'
//import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library

const middlewares = [thunk]
//const mockStore = configureMockStore(middlewares)

import axios from 'axios';
import * as Fetching from "./fetching";
import { initLostDogProps, initLostDogWithPictureProps, initPicture } from "../dog/dogClasses";
import config from "../config/config";
import { RequestResponse } from "./response";
import { ILostDogWithPicture } from "../dog/dogInterfaces";
import { ILoginInformation, ILoginResults, initCorrectRegisterRegularUserProps, initLoginProps, initRegisterRegularUserProps, IRegisterRegularUserInformation } from "../registerLogin/loginRegisterInterfaces";
//import { addDog } from './fetching';

jest.mock('axios');


/*test('the data is peanut butter', async () => {
  const data: RequestResponse<ILostDogWithPicture> = await Fetching.addDog(
    initLostDogProps,
    initPicture,
    testCookies
  );
  expect(data).toEqual(initLostDogWithPictureProps);
});*/

const errorObject = {
  "code": 0,
  "response": {
    "data": null,
    "message": "Connection error",
    "successful": false,
  }};
 

test('add the dog with a wrong token results in an error', async () => {
  //expect.assertions(1);
  
  const data: RequestResponse<ILostDogWithPicture> = await Fetching.addDog(
    initLostDogProps,
    initPicture,
    config.cookies
  );
  expect(data).toEqual(errorObject);
});

test('fetch the dogs with a wrong token results in an error', async () => {
  //expect.assertions(1);
  
  const data: RequestResponse<ILostDogWithPicture[]> = await Fetching.fetchDogs(
    {},
    config.cookies
  );
  expect(data).toEqual(errorObject);
});

test('register with wrong data', async () => {
  //expect.assertions(1);
  
  const data: RequestResponse<null> = await Fetching.registerRegularUser(
    initRegisterRegularUserProps
  );
  expect(data).toEqual(errorObject);
});


test('login with wrong data', async () => {
  //expect.assertions(1);
  
  const data: RequestResponse<ILoginResults> = await Fetching.login(
    initLoginProps
  );
  expect(data).toEqual(errorObject);
});

test('logout without being logged in', async () => {
  //expect.assertions(1);
  
  const data: RequestResponse<null> = await Fetching.logout(
    config.cookies
  );
  expect(data).toEqual(errorObject);
});

/*describe('addDog', () => {
  it('fetches successfully data from an API', async () => {
    const data = {...};

    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(addDog('react')).resolves.toEqual(data);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(addDog('react')).rejects.toThrow(errorMessage);
  });
});*/


/*'use strict';

const users = {
  4: {name: 'Mark'},
  5: {name: 'Paul'},
};

export default function request(url) {
  return new Promise((resolve, reject) => {
    const userID = parseInt(url.substr('/users/'.length), 10);
    process.nextTick(() =>
      users[userID]
        ? resolve(users[userID])
        : reject({
            error: 'User with ' + userID + ' not found.',
          }),
    );
  });
}*/

/*describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    fetchMock.getOnce('/todos', {
      body: { todos: ['do something'] },
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: types.FETCH_TODOS_REQUEST },
      { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something'] } }
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.fetchTodos()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
*/
