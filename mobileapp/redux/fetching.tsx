import config from "../config/config";
import axios, { AxiosResponse } from "axios";
import _ from "lodash";
import {
  ILoginInformation,
  ILoginResults,
} from "../components/loginRegisterInterfaces";
import { APIResponse, RequestResponse } from "./response";
import { ILostDogWithPicture } from "../components/dogs/dog/dogInterfaces";

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
