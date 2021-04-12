import { ILostDog, IPicture, ILostDogWithPicture } from "../dog/dogInterfaces";
import type { APIResponse, RequestResponse } from "./response";
import config from "../config/config";
import axios, { AxiosResponse } from "axios";
import {
  ILoginInformation,
  ILoginResults,
  IRegisterRegularUserInformation,
} from "../registerLogin/loginRegisterInterfaces";

const getToken: (cookies: { [name: string]: any }) => string = (cookies: {
  [name: string]: any;
}) => {
  let result =
    cookies[config.cookies.token] === undefined
      ? config.testTokens.regular
      : cookies[config.cookies.token];
  return result;
};

//Reimplement stringifing date
const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0");

//eslint-disable-next-line no-extend-native
Date.prototype.toJSON = function (key?: any): string {
  return (
    zeroPad(this.getFullYear(), 4) +
    "-" +
    zeroPad(this.getMonth() + 1, 2) +
    "-" +
    zeroPad(this.getDate(), 2)
  );
};

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

export async function addDog(
  dog: ILostDog,
  picture: IPicture,
  cookies: { [name: string]: any }
): Promise<RequestResponse<ILostDogWithPicture>> {
  let formData = new FormData();

  const privateProperties = ["id", "pictureId", "ownerId"];
  const excludePrivateProperties = (key: string, value: any) =>
    privateProperties.includes(key) ? undefined : value;

  formData.append(
    "dog",
    new Blob([JSON.stringify(dog, excludePrivateProperties)], {
      type: "application/json",
    }),
    ""
  );
  formData.append(
    "picture",
    new Blob([picture.data], { type: picture.fileType }),
    picture.fileName
  );

  return getResponse(
    axios.post(
      `http://${config.backend.ip}:${config.backend.port}/lostdogs`,
      formData,
      {
        headers: {
          token: getToken(cookies),
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    )
  );
}

export async function fetchDogs() {

  return axios
    .get(
      `http://${config("backend.ip")}:${config("backend.port")}/lostdogs`
    )
    .then((response) => {
      console.log(response);
      return {
        code: response.status,
        response: response.data as APIResponse<ILostDogWithPicture[]>,
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
        response: response.data as APIResponse<ILostDogWithPicture[]>,
      };
    });
}


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

export async function logout(cookies: {
  [name: string]: any;
}): Promise<RequestResponse<null>> {
  return getResponse(
    axios.post(
      `http://${config.backend.ip}:${config.backend.port}/logout`,
      undefined,
      {
        headers: {
          token: getToken(cookies),
          Accept: "application/json",
        },
      }
    )
  );
}

export async function registerRegularUser(
  newUserInfo: IRegisterRegularUserInformation
): Promise<RequestResponse<null>> {
  let formData = new FormData();
  formData.append(
    "username",
    new Blob([newUserInfo.username], {
      type: "text/plain",
    }),
    ""
  );
  formData.append(
    "password",
    new Blob([newUserInfo.password], {
      type: "text/plain",
    }),
    ""
  );
  formData.append(
    "phone_number",
    new Blob([newUserInfo.phone], {
      type: "text/plain",
    }),
    ""
  );
  formData.append(
    "email",
    new Blob([newUserInfo.email], {
      type: "text/plain",
    }),
    ""
  );

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
