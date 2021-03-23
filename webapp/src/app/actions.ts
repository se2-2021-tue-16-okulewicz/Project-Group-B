import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ILostDog, ILostDogWithPicture, IPicture } from "../dog/dogInterfaces";
import type { RequestResponse } from "./response";
import * as Fetching from "./fetching";
import {
  ILoginInformation,
  ILoginResults,
} from "../registerLogin/loginRegisterInterfaces";

export const addDogThunk = createAsyncThunk<
  RequestResponse<ILostDogWithPicture>,
  { dog: ILostDog; picture: IPicture, cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<ILostDogWithPicture> }
>(
  "AddDog",
  async (
    dogAndPictureAndCookies: { dog: ILostDog; picture: IPicture; cookies: { [name: string]: any } },
    { rejectWithValue }
  ) => {
    const response: RequestResponse<ILostDogWithPicture> = await Fetching.addDog(
      dogAndPictureAndCookies.dog,
      dogAndPictureAndCookies.picture,
      dogAndPictureAndCookies.cookies
    );

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<ILostDogWithPicture>);
    }

    return response as RequestResponse<ILostDogWithPicture>;
  }
);

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

export const clearError = createAction("clearError");
