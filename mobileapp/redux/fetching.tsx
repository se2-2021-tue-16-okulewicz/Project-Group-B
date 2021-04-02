import config from "../config/config";
import axios, { AxiosResponse } from 'axios';
import _ from "lodash";
import { ILoginInformation, ILoginResults } from "../components/loginRegisterInterfaces";
import { APIResponse, RequestResponse } from "./response";

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
  formData.append(
    "username", credentials.username
  );
  formData.append(
    "password", credentials.password
  );

  return getResponse(
    axios.post(
      `http://192.168.1.15:8080/login`,
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

