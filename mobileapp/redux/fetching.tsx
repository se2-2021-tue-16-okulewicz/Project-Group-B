import config from "../config/config";
import axios, { AxiosResponse } from "axios";
import _ from "lodash";
import {
  ILoginInformation,
  ILoginResults,
} from "../components/loginRegisterInterfaces";
import { APIResponse, RequestResponse } from "./response";
import { ILostDogWithPicture } from "../components/dogs/dog/dogInterfaces";
import { IRegisterRegularUserInformation } from "../components/register-login/loginRegisterInterfaces";

async function getResponse<T>(
  axiosRequest: Promise<AxiosResponse<any>>
): Promise<RequestResponse<T>> {
  try {
    const response = await axiosRequest;
    return {
      code: response.status,
      response: response.data as APIResponse<T>,
    };
  } catch (error) {
    if (error instanceof TypeError || error.message === "Network Error") {
      return {
        code: 0,
        response: {
          message: "Connection error",
          successful: false,
          data: null,
        },
      };
    }

    let response_1 = error.response;
    return {
      code: response_1.status,
      response: response_1.data as APIResponse<T>,
    };
  }
}

export async function login(
  credentials: ILoginInformation
): Promise<RequestResponse<ILoginResults>> {
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
  cookies: { [name: string]: any }
): Promise<RequestResponse<ILostDogWithPicture[]>> {
  const filtersString = Object.keys(filters)
    .map((filterName) => {
      const value = String(filters[filterName]).trim();
      if (filterName != "size") {
        return value ? `${filterName}=${value}` : "";
      }
    })
    .filter((x) => x !== "")
    .join("&");

  return getResponse(
    axios.get(
      `http://${config.backend.ip}:${config.backend.port}/lostdogs?${filtersString}`,
      {
        headers: {
          token: cookies,
        },
      }
    )
  );
}

export async function markLostDogAsFound(
  dogId: number,
  cookies: { [name: string]: any }
): Promise<RequestResponse<ILostDogWithPicture[]>> {
  return getResponse(
    axios.put(
      `http://${config.backend.ip}:${config.backend.port}/lostdogs/${dogId}/found`,
      undefined,
      {
        headers: {
          token: cookies,
        },
      }
    )
  );
}

export async function registerRegularUser(
  newUserInfo: IRegisterRegularUserInformation
): Promise<RequestResponse<null>> {
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
