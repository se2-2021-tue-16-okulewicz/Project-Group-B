import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as Fetching from "./fetching";
import * as Utility from "./utility";


/**
 * Thunk for adding new lost dog
 
export const addDogThunk = createAsyncThunk(
  "lostdogs",
  async (args, { rejectWithValue }) => {
    const response = await Fetching.addDogs(args.dog : LostDog, args.picture, token);

    if (response.code !== 200) return rejectWithValue(response);
    //args.afterAddition(response.body);
    return response;
  }
);*/
