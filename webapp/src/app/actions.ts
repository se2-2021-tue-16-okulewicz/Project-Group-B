import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ILostDog, ILostDogWithPicture, IPicture } from "../dog/dogInterfaces";
import type { APIResponse } from "./response";
import * as Fetching from "./fetching";


export const addDogThunk = createAsyncThunk(
  "lostdogs",
  async (dogAndPicture : {dog: ILostDog, picture: IPicture}, { rejectWithValue }) => {
    const response : APIResponse<ILostDogWithPicture> = await Fetching.addDog(dogAndPicture.dog, dogAndPicture.picture);

    console.log(response);

    if (response.successful !== true) return rejectWithValue(response);

    return response;
  }
);
