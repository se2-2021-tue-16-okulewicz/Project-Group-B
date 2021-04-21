/**
 * @jest-environment jsdom
 */


import thunk from "redux-thunk";
import expect from "expect"; // You can use any testing library

const middlewares = [thunk];
//const mockStore = configureMockStore(middlewares)

import * as Fetching from "./fetching";
import {
  initLostDogProps,
  initLostDogWithPictureProps,
  initPicture,
} from "../dog/dogClasses";
import config from "../config/config";
import { RequestResponse } from "./response";
import { ILostDogWithPicture } from "../dog/dogInterfaces";
import { ILoginResults } from "../registerLogin/loginRegisterInterfaces";
import {
  initLoginProps,
  initRegisterRegularUserProps,
} from "../registerLogin/registerLogintest";

jest.mock("axios");

const errorObject = {
  code: 0,
  response: {
    data: null,
    message: "Connection error",
    successful: false,
  },
};

test("add the dog with a wrong token results in an error", async () => {
 

  const data: RequestResponse<ILostDogWithPicture> = await Fetching.addDog(
    initLostDogProps,
    initPicture,
    config.cookies
  );
  expect(data).toEqual(errorObject);
});

test("fetch the dogs with a wrong token results in an error", async () => {
 
  const data: RequestResponse<ILostDogWithPicture[]> = await Fetching.fetchDogs(
    {},
    config.cookies
  );
  expect(data).toEqual(errorObject);
});

test("fetching one dog with a wrong token results in an error", async () => {
 
  const data: RequestResponse<ILostDogWithPicture> = await Fetching.fetchOneDog(
    0,//id
    config.cookies
  );
  expect(data).toEqual(errorObject);
});

test("updating the dog with a wrong token results in an error", async () => {
 
  const data: RequestResponse<ILostDogWithPicture> = await Fetching.updateDog(
    initLostDogWithPictureProps,//dog
    config.cookies
  );
  expect(data).toEqual(errorObject);
});

test("marking the dog as found with a wrong token results in an error", async () => {
 
  const data: RequestResponse<null> = await Fetching.markLostDogAsFound(
    0,//dog id
    {} //empty token
  );
  expect(data).toEqual(errorObject);
});

test("register with wrong data", async () => {
 

  const data: RequestResponse<null> = await Fetching.registerRegularUser(
    initRegisterRegularUserProps
  );
  expect(data).toEqual(errorObject);
});

test("login with wrong data", async () => {
 

  const data: RequestResponse<ILoginResults> = await Fetching.login(
    initLoginProps
  );
  expect(data).toEqual(errorObject);
});

test("logout without being logged in", async () => {
 

  const data: RequestResponse<null> = await Fetching.logout(config.cookies);
  expect(data).toEqual(errorObject);
});

/*test("fetch the dogs with a test token", async () => {
   const data: RequestResponse<ILostDogWithPicture[]> = await Fetching.fetchDogs(
    {//filters
      page:0,
      size:15
    },//cookies
    {token:"regularUserTestToken"},
  );
  expect(data).toEqual(0);
});*/

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
