import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as Fetching from "./actions";
import * as Utility from "./utility";

//We are not using this anymore:
//const token = `8df62db8-b296-440e-a23f-9ed58dcd2ba5`;

/**
 * Thunk for adding selected cars
 
export const addCarThunk = createAsyncThunk(
  "cars/add",
  async (args, { rejectWithValue }) => {
    const response = await Fetching.addCars(args.car, args.token);

    if (response.code !== 200) return rejectWithValue(response);
    args.afterAddition(response.body);
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
