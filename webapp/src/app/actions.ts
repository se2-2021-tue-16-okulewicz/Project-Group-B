import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LostDog } from "../dog/dogClasses";
import * as Fetching from "./fetching";
import * as Utility from "./utility";

//We are not using this anymore:
export const token = `8df62db8-b296-440e-a23f-9ed58dcd2ba5`;

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

/**
 * Thunk for uploading car image
 * @param {Object} data - object with two properties: file and id of car
 
export const uploadCarImageThunk = createAsyncThunk(
  "cars/uploadCarImage",
  async (data, { rejectWithValue }) => {
    const response = await Fetching.uploadCarImage(
      data.file,
      data.id,
      data.token
    );

    if (response.code !== 200) return rejectWithValue(response);

    return response;
  }
);*/
