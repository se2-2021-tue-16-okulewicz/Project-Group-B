import config from "../config/config";
import axios from 'axios';
import _ from "lodash";
import { ILoginInformation, ILoginResults } from "../components/loginRegisterInterfaces";
import { APIResponse, RequestResponse } from "./response";

/**
 * Log into an account
 */
 export async function login(
  credentials: ILoginInformation
): Promise<RequestResponse<ILoginResults>> {
  let formData = new FormData();
  formData.append(
    "username",
    new Blob([credentials.username], {
      type: "text/plain",
    }),
    ""
  );
  formData.append(
    "password",
    new Blob([credentials.password], {
      type: "text/plain",
    }),
    ""
  );

  return axios
    .post(
      `http://localhost:8080/login`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      return {
        code: response.status,
        response: response.data as APIResponse<ILoginResults>,
      };
    })
    .catch((error) => {
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

      let response = error.response;
      return {
        code: response.status,
        response: response.data as APIResponse<ILoginResults>,
      };
    });
}
