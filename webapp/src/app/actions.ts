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
  RequestResponse<null, undefined>,
  { dogId: number; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<null, undefined> }
>(
  "MarkDogAsFound",
  async (
    dogAndCookies: {
      dogId: number;
      cookies: { [name: string]: any };
    },
    { rejectWithValue }
  ) => {
    const response: RequestResponse<
      null,
      undefined
    > = await Fetching.markLostDogAsFound(
      dogAndCookies.dogId,
      dogAndCookies.cookies
    );

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<null, undefined>);
    }

    return response as RequestResponse<null, undefined>;
  }
);

export const fetchContactInfoThunk = createAsyncThunk<
  RequestResponse<IContactInfo, undefined>,
  { userId: number; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<IContactInfo, undefined> }
>(
  "FetchUserInfo",
  async (
    userAndCookies: {
      userId: number;
      cookies: { [name: string]: any };
    },
    { rejectWithValue }
  ) => {
    const response: RequestResponse<
      IContactInfo,
      undefined
    > = await Fetching.fetchUserInfo(
      userAndCookies.userId,
      userAndCookies.cookies
    );

    if (response.response.successful !== true) {
      return rejectWithValue(
        response as RequestResponse<IContactInfo, undefined>
      );
    }

    return response as RequestResponse<IContactInfo, undefined>;
  }
);

export const updateContactInfoThunk = createAsyncThunk<
  RequestResponse<IContactInfo, undefined>,
  {
    userId: number;
    contactInfo: IContactInfo;
    cookies: { [name: string]: any };
  },
  { rejectValue: RequestResponse<IContactInfo, undefined> }
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
    const response: RequestResponse<
      IContactInfo,
      undefined
    > = await Fetching.updateContactInfo(
      userAndContactInfoAndCookies.userId,
      userAndContactInfoAndCookies.contactInfo,
      userAndContactInfoAndCookies.cookies
    );

    if (response.response.successful !== true) {
      return rejectWithValue(
        response as RequestResponse<IContactInfo, undefined>
      );
    }
    return response as RequestResponse<IContactInfo, undefined>;
  }
);

export const addDogThunk = createAsyncThunk<
  RequestResponse<ILostDogWithPicture, undefined>,
  { dog: ILostDog; picture: IPicture; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<ILostDogWithPicture, undefined> }
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
    const response: RequestResponse<
      ILostDogWithPicture,
      undefined
    > = await Fetching.addDog(
      dogAndPictureAndCookies.dog,
      dogAndPictureAndCookies.picture,
      dogAndPictureAndCookies.cookies
    );

    if (response.response.successful !== true) {
      return rejectWithValue(
        response as RequestResponse<ILostDogWithPicture, undefined>
      );
    }

    return response as RequestResponse<ILostDogWithPicture, undefined>;
  }
);

export const updateDogThunk = createAsyncThunk<
  RequestResponse<ILostDogWithPicture, undefined>,
  { dog: ILostDog; picture: IPicture; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<ILostDogWithPicture, undefined> }
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
    const response: RequestResponse<
      ILostDogWithPicture,
      undefined
    > = await Fetching.updateDog(
      dogAndPictureAndCookies.dog,
      dogAndPictureAndCookies.picture,
      dogAndPictureAndCookies.cookies
    );

    if (response.response.successful !== true) {
      return rejectWithValue(
        response as RequestResponse<ILostDogWithPicture, undefined>
      );
    }

    return response as RequestResponse<ILostDogWithPicture, undefined>;
  }
);

export const loginThunk = createAsyncThunk<
  RequestResponse<ILoginResults, undefined>,
  ILoginInformation,
  { rejectValue: RequestResponse<ILoginResults, undefined> }
>("login", async (credentials: ILoginInformation, { rejectWithValue }) => {
  const response: RequestResponse<
    ILoginResults,
    undefined
  > = await Fetching.login(credentials);

  if (response.response.successful !== true) {
    return rejectWithValue(
      response as RequestResponse<ILoginResults, undefined>
    );
  }

  return response as RequestResponse<ILoginResults, undefined>;
});

export const logoutThunk = createAsyncThunk<
  RequestResponse<null, undefined>,
  { [name: string]: any },
  { rejectValue: RequestResponse<null, undefined> }
>("logout", async (cookies: { [name: string]: any }, { rejectWithValue }) => {
  const response: RequestResponse<null, undefined> = await Fetching.logout(
    cookies
  );

  if (response.response.successful !== true) {
    return rejectWithValue(response as RequestResponse<null, undefined>);
  }

  return response as RequestResponse<null, undefined>;
});

export const fetchDogsThunk = createAsyncThunk<
  RequestResponse<ILostDogWithPicture[], number>,
  { filters: IFilters; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<ILostDogWithPicture[], number> }
>("fetchAllDogs", async (item: IFiltersAndCookies, { rejectWithValue }) => {
  const response: RequestResponse<
    ILostDogWithPicture[],
    number
  > = await Fetching.fetchDogs(item.filters, item.cookies);

  if (response.response.successful !== true) {
    return rejectWithValue(
      response as RequestResponse<ILostDogWithPicture[], number>
    );
  }

  return response as RequestResponse<ILostDogWithPicture[], number>;
});

export const fetchOneDogThunk = createAsyncThunk<
  RequestResponse<ILostDogWithPicture, undefined>,
  { id: number; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<ILostDogWithPicture, undefined> }
>("fetchOneDog", async (item: IFilters, { rejectWithValue }) => {
  const response: RequestResponse<
    ILostDogWithPicture,
    undefined
  > = await Fetching.fetchOneDog(item.id, item.cookies);

  if (response.response.successful !== true) {
    return rejectWithValue(
      response as RequestResponse<ILostDogWithPicture, undefined>
    );
  }
  return response as RequestResponse<ILostDogWithPicture, undefined>;
});

export const registerRegularUserThunk = createAsyncThunk<
  RequestResponse<ILoginResults, undefined>,
  IRegisterRegularUserInformation,
  { rejectValue: RequestResponse<null, undefined> }
>(
  "registeregularUser",
  async (newUserInfo: IRegisterRegularUserInformation, { rejectWithValue }) => {
    const response: RequestResponse<
      null,
      undefined
    > = await Fetching.registerRegularUser(newUserInfo);

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<null, undefined>);
    }

    const responseLogin: RequestResponse<
      ILoginResults,
      undefined
    > = await Fetching.login({
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
          metadata: null,
        },
      });
    }

    return responseLogin as RequestResponse<ILoginResults, undefined>;
  }
);

export const clearError = createAction("clearError");
export const clearLoginInformation = createAction("clearLoginInformation");
export const clearRedirect = createAction("clearRedirect");
export const clearDogList = createAction("clearDogList");
export const startRefreshing = createAction("startRefreshing");
export const finishRefreshing = createAction("finishRefreshing");
