import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as Fetching from "./fetching";
import * as Utility from "./utility.js";

/**
 * Thunk for logging into an account
 * @param {Object} loginData an object containing registration details
 */
export const logInThunk = createAsyncThunk(
  "account/login",
  async (
    loginData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const response = await Fetching.logIn(loginData.email, loginData.password);

    if (response.code !== 200) return rejectWithValue(response);

    return response;
  }
);

/*
 * Reseting state to idle.
 */
export const setIdle = createAction("setIdle");
