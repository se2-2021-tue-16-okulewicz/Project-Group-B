import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILostDog, ILostDogWithPicture, IPicture } from "../dog/dogInterfaces";
import type { RequestResponse } from "./response";
import * as Fetching from "./fetching";

export const addDogThunk = createAsyncThunk(
  "AddDog",
  async (
    dogAndPicture: { dog: ILostDog; picture: IPicture },
    { rejectWithValue }
  ) => {
    const response: RequestResponse<ILostDogWithPicture> = await Fetching.addDog(
      dogAndPicture.dog,
      dogAndPicture.picture
    );

    if (response.response.successful !== true) return rejectWithValue(response);

    return response;
  }
);
