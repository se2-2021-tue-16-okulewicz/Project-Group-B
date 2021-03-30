import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as Fetching from "./fetching";
import * as Utility from "./utility.js";
import {
  ILoginInformation,
  ILoginResults,
} from "../registerLogin/loginRegisterInterfaces";
import { RequestResponse } from "./response";

/**
 * Thunk for logging into an account
 * @param {Object} loginData an object containing registration details
 */
// export const signInThunk = createAsyncThunk(
//   "login",
//   async (
//     loginData: { username: string; password: string },
//     { rejectWithValue }
//   ) => {
//     const response = await Fetching.logIn(loginData.username, loginData.password);

//     if (response.code !== 200) return rejectWithValue(response);

//     return response;
//   }
// );

export const loginThunk = createAsyncThunk<
  RequestResponse<ILoginResults>,
  ILoginInformation,
  { rejectValue: RequestResponse<ILoginResults> }
>("login", async (credentials: ILoginInformation, { rejectWithValue }) => {
  const response: RequestResponse<ILoginResults> = await Fetching.login(
    credentials
  );

  if (response.response.successful !== true) {
    return rejectWithValue(response as RequestResponse<ILoginResults>);
  }

  return response as RequestResponse<ILoginResults>;
});

/*
 * Reseting state to idle.
 */
export const setIdle = createAction("setIdle");
export const clearLoginInformation = createAction("clearLoginInformation");
