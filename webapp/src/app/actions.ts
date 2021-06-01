import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ILostDog,
  ILostDogWithPicture,
  IPicture,
  IShelterDog,
  IShelterDogWithPicture,
} from "../dog/dogInterfaces";
import type { RequestResponse } from "./response";
import * as Fetching from "./fetching";
import { IContactInfo } from "../contactInfo/contactInfoInterface";
import { IFilters, IFiltersAndCookies, IShelterInfo } from "../utilityComponents/utilities";
import {
  ILoginInformation,
  ILoginResults,
  IRegisterRegularUserInformation,
} from "../registerLogin/LoginRegisterInterface";
import { IShelter } from "../shelter/shelterInterfaces";

/*TODO: fix any*/

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
    const response: RequestResponse<null, undefined> =
      await Fetching.markLostDogAsFound(
        dogAndCookies.dogId,
        dogAndCookies.cookies
      );

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<null, undefined>);
    }

    return response as RequestResponse<null, undefined>;
  }
);

export const deleteOneShelterDogThunk = createAsyncThunk<
  RequestResponse<undefined, undefined>,
  { shelterId: number; dogId: number; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<undefined, undefined> }
>(
  "deleteShelterDog",
  async (
    userAndCookies: {
      shelterId: number;
      dogId: number;
      cookies: { [name: string]: any };
    },
    { rejectWithValue }
  ) => {
    const response: RequestResponse<undefined, undefined> =
      await Fetching.deleteOneShelterDog(
        userAndCookies.shelterId,
        userAndCookies.dogId,
        userAndCookies.cookies
      );

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<undefined, undefined>);
    }

    return response as RequestResponse<undefined, undefined>;
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
    const response: RequestResponse<IContactInfo, undefined> =
      await Fetching.fetchUserInfo(
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
    const response: RequestResponse<IContactInfo, undefined> =
      await Fetching.updateContactInfo(
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
    const response: RequestResponse<ILostDogWithPicture, undefined> =
      await Fetching.addDog(
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

export const addShelterDogThunk = createAsyncThunk<
  RequestResponse<IShelterDogWithPicture, undefined>,
  {
    shelterId: number;
    dog: IShelterDog;
    picture: IPicture;
    cookies: { [name: string]: any };
  },
  { rejectValue: RequestResponse<IShelterDogWithPicture, undefined> }
>(
  "AddShelterDog",
  async (
    dogAndPictureAndCookies: {
      shelterId: number;
      dog: IShelterDog;
      picture: IPicture;
      cookies: { [name: string]: any };
    },
    { rejectWithValue }
  ) => {
    const response: RequestResponse<IShelterDogWithPicture, undefined> =
      await Fetching.addShelterDog(
        dogAndPictureAndCookies.shelterId,
        dogAndPictureAndCookies.dog,
        dogAndPictureAndCookies.picture,
        dogAndPictureAndCookies.cookies
      );

    if (response.response.successful !== true) {
      return rejectWithValue(
        response as RequestResponse<IShelterDogWithPicture, undefined>
      );
    }

    return response as RequestResponse<IShelterDogWithPicture, undefined>;
  }
);

export const updateDogThunk = createAsyncThunk<
  RequestResponse<ILostDogWithPicture, undefined>,
  { dog: ILostDog; cookies: { [name: string]: any }; picture?: IPicture },
  { rejectValue: RequestResponse<ILostDogWithPicture, undefined> }
>(
  "UpdateDog",
  async (
    dogAndPictureAndCookies: {
      dog: ILostDog;
      cookies: { [name: string]: any };

      picture?: IPicture;
    },
    { rejectWithValue }
  ) => {
    const response: RequestResponse<ILostDogWithPicture, undefined> =
      await Fetching.updateDog(
        dogAndPictureAndCookies.dog,
        dogAndPictureAndCookies.cookies,
        dogAndPictureAndCookies.picture
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
  const response: RequestResponse<ILoginResults, undefined> =
    await Fetching.login(credentials);

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
  const response: RequestResponse<ILostDogWithPicture[], number> =
    await Fetching.fetchDogs(item.filters, item.cookies);

  if (response.response.successful !== true) {
    return rejectWithValue(
      response as RequestResponse<ILostDogWithPicture[], number>
    );
  }

  return response as RequestResponse<ILostDogWithPicture[], number>;
});

export const fetchShelterDogsThunk = createAsyncThunk<
  RequestResponse<IShelterDog[], Number>,
  { filters: IFilters; shelterId: number; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<IShelterDog[], Number> }
>(
  "fetchShelterDogsThunk",
  async (
    userAndCookies: {
      filters: IFilters;
      shelterId: number;
      cookies: { [name: string]: any };
    },
    { rejectWithValue }
  ) => {
    const response: RequestResponse<IShelterDog[], Number> =
      await Fetching.fetchShelterDogs(
        userAndCookies.filters,
        userAndCookies.shelterId,
        userAndCookies.cookies
      );
    //console.log(response);
    if (response.response.successful !== true) {
      return rejectWithValue(
        response as RequestResponse<IShelterDog[], number>
      );
    }

    return response as RequestResponse<IShelterDog[], number>;
  }
);

export const fetchSheltersThunk = createAsyncThunk<
  RequestResponse<IShelter[], Number>,
  { filters: IFilters; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<IShelter[], Number> }
>(
  "fetchShelterDogs",
  async (
    filtersAndCookies: {
      filters: IFilters;
      cookies: { [name: string]: any };
    },
    { rejectWithValue }
  ) => {
    const response: RequestResponse<IShelter[], Number> =
      await Fetching.fetchShelters(
        filtersAndCookies.filters,
        filtersAndCookies.cookies
      );

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<IShelter[], number>);
    }

    return response as RequestResponse<IShelter[], number>;
  }
);

export const fetchOneDogThunk = createAsyncThunk<
  RequestResponse<ILostDogWithPicture, undefined>,
  { id: number; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<ILostDogWithPicture, undefined> }
>("fetchOneDog", async (item: IFilters, { rejectWithValue }) => {
  const response: RequestResponse<ILostDogWithPicture, undefined> =
    await Fetching.fetchOneDog(item.id, item.cookies);

  if (response.response.successful !== true) {
    return rejectWithValue(
      response as RequestResponse<ILostDogWithPicture, undefined>
    );
  }
  return response as RequestResponse<ILostDogWithPicture, undefined>;
});

export const fetchOneShelterDogThunk = createAsyncThunk<
  RequestResponse<IShelterDogWithPicture, undefined>,
  { shelterId: number; id: number; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<IShelterDogWithPicture, undefined> }
>("fetchOneShelterDog", async (item: IFilters, { rejectWithValue }) => {
  const response: RequestResponse<IShelterDogWithPicture, undefined> =
    await Fetching.fetchOneShelterDog(item.shelterId, item.id, item.cookies);

  if (response.response.successful !== true) {
    return rejectWithValue(
      response as RequestResponse<IShelterDogWithPicture, undefined>
    );
  }
  return response as RequestResponse<IShelterDogWithPicture, undefined>;
});

export const fetchOneShelterThunk = createAsyncThunk<
  RequestResponse<IShelter, undefined>,
  { id: number; cookies: { [name: string]: any } },
  { rejectValue: RequestResponse<IShelter, undefined> }
>("fetchOneShelter", async (item: IFilters, { rejectWithValue }) => {
  const response: RequestResponse<IShelter, undefined> =
    await Fetching.fetchOneShelter(item.id, item.cookies);

  if (response.response.successful !== true) {
    return rejectWithValue(response as RequestResponse<IShelter, undefined>);
  }
  return response as RequestResponse<IShelter, undefined>;
});

export const registerShelterUserThunk = createAsyncThunk<
  RequestResponse<null, undefined>,
  IShelterInfo,
  { rejectValue: RequestResponse<null, undefined> }
>(
  "registerShelterUser",
  async (newUserInfo: IShelterInfo, { rejectWithValue }) => {
    const response: RequestResponse<null, undefined> =
      await Fetching.registerShelterUser(newUserInfo);

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<null, undefined>);
    }

    return response as RequestResponse<null, undefined>;
  }
);



export const registerRegularUserThunk = createAsyncThunk<
  RequestResponse<ILoginResults, undefined>,
  IRegisterRegularUserInformation,
  { rejectValue: RequestResponse<null, undefined> }
>(
  "registeregularUser",
  async (newUserInfo: IRegisterRegularUserInformation, { rejectWithValue }) => {
    const response: RequestResponse<null, undefined> =
      await Fetching.registerRegularUser(newUserInfo);

    if (response.response.successful !== true) {
      return rejectWithValue(response as RequestResponse<null, undefined>);
    }

    const responseLogin: RequestResponse<ILoginResults, undefined> =
      await Fetching.login({
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
