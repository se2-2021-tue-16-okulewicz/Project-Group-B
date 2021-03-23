import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ILostDog, ILostDogWithPicture, IPicture } from "../dog/dogInterfaces";
import type { RequestResponse } from "./response";
import * as Fetching from "./fetching";

export const addDogThunk = createAsyncThunk<
  RequestResponse<ILostDogWithPicture>,
  { dog: ILostDog; picture: IPicture },
  { rejectValue: RequestResponse<ILostDogWithPicture> }
>(
  "AddDog",
  async (
    dogAndPicture: { dog: ILostDog; picture: IPicture },
    { rejectWithValue }
  ) => {
    const response: RequestResponse<ILostDogWithPicture> = await Fetching.addDog(
      dogAndPicture.dog,
      dogAndPicture.picture
    );

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<ILostDogWithPicture>);
    }

    return response as RequestResponse<ILostDogWithPicture>;
  }
);

export const clearError = createAction("clearError");
