import config from "../config/config";
import axios, { AxiosResponse } from "axios";
import _ from "lodash";
import {
  ILoginInformation,
  ILoginResults,
} from "../components/loginRegisterInterfaces";
import { APIResponse, RequestResponse } from "./response";
import {
  IImage,
  ILostDog,
  ILostDogWithPicture,
  IPicture,
} from "../components/dogs/dog/dogInterfaces";
import { IRegisterRegularUserInformation } from "../components/register-login/loginRegisterInterfaces";

async function getResponse<T, K>(
  axiosRequest: Promise<AxiosResponse<any>>
): Promise<RequestResponse<T, K>> {
  try {
    const response = await axiosRequest;
    return {
      code: response.status,
      response: response.data as APIResponse<T, K>,
    };
  } catch (error) {
    if (error instanceof TypeError || error.message === "Network Error") {
      return {
        code: 0,
        response: {
          message: "Connection error",
          successful: false,
          data: null,
          metadata: null,
        },
      };
    }

    let response_1 = error.response;
    return {
      code: response_1.status,
      response: response_1.data as APIResponse<T, K>,
    };
  }
}

export async function login(
  credentials: ILoginInformation
): Promise<RequestResponse<ILoginResults, undefined>> {
  let formData = new FormData();
  formData.append("username", credentials.username);
  formData.append("password", credentials.password);

  return getResponse(
    axios.post(
      `http://${config.backend.ip}:${config.backend.port}/login`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    )
  );
}

export async function fetchDogs(
  filters: { [name: string]: any },
  Authorization: { [name: string]: any }
): Promise<RequestResponse<ILostDogWithPicture[], number>> {
  const filtersString =
    filters === undefined
      ? ""
      : Object.keys(filters)
          .map((filterName) => {
            if (typeof filters[filterName] === "object") {
              let sub = filters[filterName];
              const subFilters = Object.keys(sub)
                .map((subname) => {
                  const name = filterName + "." + subname.split("_").join(".");
                  const value = String(sub[subname]).trim();
                  return value && value != "null" ? `${name}=${value}` : "";
                })
                .filter((x) => x !== "")
                .join("&");
              return subFilters ? subFilters : "";
            } else {
              const value = String(filters[filterName]).trim();
              return value && value != "null" ? `${filterName}=${value}` : "";
            }
          })
          .filter((x) => x !== "")
          .join("&");

  return getResponse(
    axios.get(
      `http://${config.backend.ip}:${config.backend.port}/lostdogs?${filtersString}`,
      {
        headers: {
          Authorization: Authorization,
        },
      }
    )
  );
}

export async function markLostDogAsFound(
  dogId: number,
  Authorization: { [name: string]: any }
): Promise<RequestResponse<null, undefined>> {
  return getResponse(
    axios.put(
      `http://${config.backend.ip}:${config.backend.port}/lostdogs/${dogId}/found`,
      undefined,
      {
        headers: {
          Authorization: Authorization,
        },
      }
    )
  );
}

export async function registerRegularUser(
  newUserInfo: IRegisterRegularUserInformation
): Promise<RequestResponse<null, undefined>> {
  let formData = new FormData();
  formData.append("username", newUserInfo.username);
  formData.append("password", newUserInfo.password);
  formData.append("phone_number", newUserInfo.phone);
  formData.append("email", newUserInfo.email);

  return getResponse(
    axios.post(
      `http://${config.backend.ip}:${config.backend.port}/register`,
      formData,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
  );
}

export async function addDog(
  dog: ILostDog,
  picture: IImage,
  Authorization: { [name: string]: any }
): Promise<RequestResponse<ILostDogWithPicture, undefined>> {
  let formData = new FormData();

  let behLength = dog.behaviors.length;
  formData.append("name", dog.name);
  formData.append("breed", dog.breed);
  formData.append("age", dog.age);
  formData.append("hair_length", dog.hairLength);
  formData.append("color", dog.color);
  formData.append("size", dog.size);
  formData.append("ears_type", dog.earsType);
  formData.append("tail_length", dog.tailLength);
  formData.append("special_mark", dog.specialMark);
  if (behLength === 0) {
    formData.append("behavior1", " ");
    formData.append("behavior2", " ");
    formData.append("behavior3", " ");
  } else {
    formData.append("behavior1", dog.behaviors[0 % behLength]);
    formData.append("behavior2", dog.behaviors[1 % behLength]);
    formData.append("behavior3", dog.behaviors[2 % behLength]);
  }
  formData.append("city", dog.location.city);
  formData.append("district", dog.location.district);
  formData.append("date_lost", dog.dateLost as string);
  formData.append("picture", {
    name: picture.fileName,
    type: picture.fileType,
    uri: picture.uri,
  });

  return getResponse(
    axios.post(
      `http://${config.backend.ip}:${config.backend.port}/lostdogs/mobile`,
      formData,
      {
        headers: {
          Authorization: Authorization,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    )
  );
}
