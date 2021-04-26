import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ILostDog, ILostDogWithPicture, IPicture } from "../dog/dogInterfaces";
import type { RequestResponse } from "./response";
import * as Fetching from "./fetching";
import { IContactInfo } from "../contactInfo/contactInfoInterfaces";
import {
  ILoginInformation,
  ILoginResults,
  IRegisterRegularUserInformation,
} from "../registerLogin/loginRegisterInterfaces";
import { IFilters, IFiltersAndCookies } from "../utilityComponents/utilities";

export const markDogAsFoundThunk = createAsyncThunk<
  RequestResponse<null>,
  { dogId: number; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<null> }
>(
  "MarkDogAsFound",
  async (
    dogAndCookies: {
      dogId: number;
      cookies: { [name: string]: any };
    },
    { rejectWithValue }
  ) => {
    const response: RequestResponse<null> = await Fetching.markLostDogAsFound(
      dogAndCookies.dogId,
      dogAndCookies.cookies
    );

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<null>);
    }

    return response as RequestResponse<null>;
  }
);

export const fetchContactInfoThunk = createAsyncThunk<
  RequestResponse<IContactInfo>,
  { userId: number; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<IContactInfo> }
>(
  "FetchUserInfo",
  async (
    userAndCookies: {
      userId: number;
      cookies: { [name: string]: any };
    },
    { rejectWithValue }
  ) => {
    const response: RequestResponse<IContactInfo> = await Fetching.fetchUserInfo(
      userAndCookies.userId,
      userAndCookies.cookies
    );

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<IContactInfo>);
    }

    return response as RequestResponse<IContactInfo>;
  }
);

export const updateContactInfoThunk = createAsyncThunk<
  RequestResponse<IContactInfo>,
  {
    userId: number;
    contactInfo: IContactInfo;
    cookies: { [name: string]: any };
  },
  { rejectValue: RequestResponse<IContactInfo> }
>(
  "UpdateContactInfo",
  async (
    userAndContactInfoAndCookies: {
      userId: number;
      contactInfo: IContactInfo;
      cookies: { [name: string]: any };
    },
    { rejectWithValue }
  ) => {
    const response: RequestResponse<IContactInfo> = await Fetching.updateContactInfo(
      userAndContactInfoAndCookies.userId,
      userAndContactInfoAndCookies.contactInfo,
      userAndContactInfoAndCookies.cookies
    );

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<IContactInfo>);
    }
    return response as RequestResponse<IContactInfo>;
  }
);

export const addDogThunk = createAsyncThunk<
  RequestResponse<ILostDogWithPicture>,
  { dog: ILostDog; picture: IPicture; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<ILostDogWithPicture> }
>(
  "AddDog",
  async (
    dogAndPictureAndCookies: {
      dog: ILostDog;
      picture: IPicture;
      cookies: { [name: string]: any };
    },
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

export const updateDogThunk = createAsyncThunk<
  RequestResponse<ILostDogWithPicture>,
  { dog: ILostDog; picture: IPicture; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<ILostDogWithPicture> }
>(
  "UpdateDog",
  async (
    dogAndPictureAndCookies: {
      dog: ILostDog;
      picture: IPicture;
      cookies: { [name: string]: any };
    },
    { rejectWithValue }
  ) => {
    const response: RequestResponse<ILostDogWithPicture> = await Fetching.updateDog(
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

export const logoutThunk = createAsyncThunk<
  RequestResponse<null>,
  { [name: string]: any },
  { rejectValue: RequestResponse<null> }
>("logout", async (cookies: { [name: string]: any }, { rejectWithValue }) => {
  const response: RequestResponse<null> = await Fetching.logout(cookies);

  if (response.response.successful !== true) {
    return rejectWithValue(response as RequestResponse<null>);
  }

  return response as RequestResponse<null>;
});

export const fetchDogsThunk = createAsyncThunk<
  RequestResponse<ILostDogWithPicture[]>,
  { filters: IFilters; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<ILostDogWithPicture[]> }
>("fetchAllDogs", async (item: IFiltersAndCookies, { rejectWithValue }) => {
  const response: RequestResponse<
    ILostDogWithPicture[]
  > = await Fetching.fetchDogs(item.filters, item.cookies);

  if (response.response.successful !== true) {
    return rejectWithValue(response as RequestResponse<ILostDogWithPicture[]>);
  }

  return response as RequestResponse<ILostDogWithPicture[]>;
});

export const fetchOneDogThunk = createAsyncThunk<
  RequestResponse<ILostDogWithPicture>,
  { id: number; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<ILostDogWithPicture> }
>("fetchOneDog", async (item: IFilters, { rejectWithValue }) => {
  const response: RequestResponse<ILostDogWithPicture> = await Fetching.fetchOneDog(
    item.id,
    item.cookies
  );

  if (response.response.successful !== true) {
    return rejectWithValue(response as RequestResponse<ILostDogWithPicture>);
  }
  return response as RequestResponse<ILostDogWithPicture>;
});

export const registerRegularUserThunk = createAsyncThunk<
  RequestResponse<ILoginResults>,
  IRegisterRegularUserInformation,
  { rejectValue: RequestResponse<null> }
>(
  "registeregularUser",
  async (newUserInfo: IRegisterRegularUserInformation, { rejectWithValue }) => {
    const response: RequestResponse<null> = await Fetching.registerRegularUser(
      newUserInfo
    );

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<null>);
    }

    const responseLogin: RequestResponse<ILoginResults> = await Fetching.login({
      //On success we want to acutally login
      username: newUserInfo.username,
      password: newUserInfo.password,
    });

    if (response.response.successful !== true) {
      return rejectWithValue({
        code: responseLogin.code,
        response: {
          message: responseLogin.response.message,
          successful: responseLogin.response.successful,
          data: null,
        },
      });
    }

    return responseLogin as RequestResponse<ILoginResults>;
  }
);

export const clearError = createAction("clearError");
export const clearLoginInformation = createAction("clearLoginInformation");
export const clearRedirect = createAction("clearRedirect");
export const clearDogList = createAction("clearDogList");
export const startRefreshing = createAction("startRefreshing");
export const finishRefreshing = createAction("finishRefreshing");
