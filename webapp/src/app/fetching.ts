import {
  ILostDog,
  IPicture,
  ILostDogWithPicture,
  IShelterDog,
  IShelterDogWithPicture,
} from "../dog/dogInterfaces";
import type { APIResponse, RequestResponse } from "./response";
import config from "../config/config";
import axios, { AxiosResponse } from "axios";
import { IContactInfo } from "../contactInfo/contactInfoInterface";
import {
  ILoginInformation,
  ILoginResults,
  IRegisterRegularUserInformation,
} from "../registerLogin/LoginRegisterInterface";
import { IShelter } from "../shelter/shelterInterfaces";

const getToken: (cookies: { [name: string]: any }) => string = (cookies: {
  [name: string]: any;
}) => {
  let result =
    cookies[config.cookies.token] === undefined
      ? config.testTokens.regular
      : cookies[config.cookies.token];
  return result;
};

const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0"); //Reimplement stringifing date

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

export async function fetchShelterDogs(
  filters: { [name: string]: any },
  shelterId: number,
  cookies: { [name: string]: any }
): Promise<RequestResponse<IShelterDog[], Number>> {
  const filtersString =
    filters === undefined
      ? ""
      : Object.keys(filters)
          .map((filterName) => {
            const value = String(filters[filterName]).trim();
            return value && value !== "null" ? `${filterName}=${value}` : "";
          })
          .filter((x) => x !== "")
          .join("&");
  return getResponse(
    axios.get(
      `http://${config.backend.ip}:${config.backend.port}/shelters/${shelterId}/dogs?${filtersString}`,
      {
        headers: {
          Authorization: getToken(cookies),
        },
      }
    )
  );
}

export async function fetchShelters(
  filters: { [name: string]: any },
  cookies: { [name: string]: any }
): Promise<RequestResponse<IShelter[], Number>> {
  const filtersString =
    filters === undefined
      ? ""
      : Object.keys(filters)
          .map((filterName) => {
            const value = String(filters[filterName]).trim();
            return value && value !== "null" ? `${filterName}=${value}` : "";
          })
          .filter((x) => x !== "")
          .join("&");
  return getResponse(
    axios.get(
      `http://${config.backend.ip}:${config.backend.port}/shelters?${filtersString}`,
      {
        headers: {
          Authorization: getToken(cookies),
        },
      }
    )
  );
}

export async function fetchDogs(
  filters: { [name: string]: any },
  cookies: { [name: string]: any }
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
                  return value && value !== "null" ? `${name}=${value}` : "";
                })
                .filter((x) => x !== "")
                .join("&");
              return subFilters ? subFilters : "";
            } else {
              const value = String(filters[filterName]).trim();
              return value && value !== "null" ? `${filterName}=${value}` : "";
            }
          })
          .filter((x) => x !== "")
          .join("&");
  return getResponse(
    axios.get(
      `http://${config.backend.ip}:${config.backend.port}/lostdogs?${filtersString}`,
      {
        headers: {
          Authorization: getToken(cookies),
        },
      }
    )
  );
}

export async function fetchOneDog(
  id: Number,
  cookies: { [name: string]: any }
): Promise<RequestResponse<ILostDogWithPicture, undefined>> {
  return getResponse(
    axios.get(
      `http://${config.backend.ip}:${config.backend.port}/lostdogs/${id}`,
      {
        headers: {
          Authorization: getToken(cookies),
        },
      }
    )
  );
}

export async function fetchOneShelterDog(
  shelterId: Number,
  id: Number,
  cookies: { [name: string]: any }
): Promise<RequestResponse<IShelterDogWithPicture, undefined>> {
  return getResponse(
    axios.get(
      `http://${config.backend.ip}:${config.backend.port}/shelters/${shelterId}/dogs/${id}`,
      {
        headers: {
          Authorization: getToken(cookies),
        },
      }
    )
  );
}

export async function fetchOneShelter(
  id: Number,
  cookies: { [name: string]: any }
): Promise<RequestResponse<IShelter, undefined>> {
  return getResponse(
    axios.get(
      `http://${config.backend.ip}:${config.backend.port}/shelters/${id}`,
      {
        headers: {
          Authorization: getToken(cookies),
        },
      }
    )
  );
}

export async function addDog(
  dog: ILostDog,
  picture: IPicture,
  cookies: { [name: string]: any }
): Promise<RequestResponse<ILostDogWithPicture, undefined>> {
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
          Authorization: getToken(cookies),
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    )
  );
}

export async function addShelterDog(
  shelterId: number,
  dog: IShelterDog,
  picture: IPicture,
  cookies: { [name: string]: any }
): Promise<RequestResponse<IShelterDogWithPicture, undefined>> {
  let formData = new FormData();

  const privateProperties = ["id", "pictureId", "shelterId"];
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
      `http://${config.backend.ip}:${config.backend.port}/shelters/${shelterId}/dogs`,
      formData,
      {
        headers: {
          Authorization: getToken(cookies),
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    )
  );
}

/*TODO: dog update does not need a picture anymore*/
export async function updateDog(
  dog: ILostDog,
  cookies: { [name: string]: any },
  picture?: IPicture
): Promise<RequestResponse<ILostDogWithPicture, undefined>> {
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
  if (picture) {
    formData.append(
      "picture",
      new Blob([picture.data], { type: picture.fileType }),
      picture.fileName
    );
  }
  return getResponse(
    axios.put(
      `http://${config.backend.ip}:${config.backend.port}/lostdogs/${dog.id}`,
      formData,
      {
        headers: {
          Authorization: getToken(cookies),
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    )
  );
}

export async function updateContactInfo(
  userId: number,
  contactInfo: IContactInfo,
  cookies: { [name: string]: any }
): Promise<RequestResponse<IContactInfo, undefined>> {
  let userdata = new FormData();

  userdata.append(
    "userdata",
    new Blob([JSON.stringify(contactInfo)], {
      type: "application/json",
    }),
    ""
  );
  return getResponse(
    axios.put(
      `http://${config.backend.ip}:${config.backend.port}/user/${userId}`,
      userdata,
      {
        headers: {
          Authorization: getToken(cookies),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
  );
}

export async function markLostDogAsFound(
  dogId: number,
  cookies: { [name: string]: any }
): Promise<RequestResponse<null, undefined>> {
  return getResponse(
    axios.put(
      `http://${config.backend.ip}:${config.backend.port}/lostdogs/${dogId}/found`,
      undefined,
      {
        headers: {
          Authorization: getToken(cookies),
        },
      }
    )
  );
}

export async function fetchUserInfo(
  userId: number,
  cookies: { [name: string]: any }
): Promise<RequestResponse<IContactInfo, undefined>> {
  return getResponse(
    axios.get(
      `http://${config.backend.ip}:${config.backend.port}/user/${userId}`,
      {
        headers: {
          Authorization: getToken(cookies),
        },
      }
    )
  );
}

export async function login(
  credentials: ILoginInformation
): Promise<RequestResponse<ILoginResults, undefined>> {
  let formData = new FormData();
  credentials.email = credentials.username;
  formData.append(
    "email",
    new Blob([credentials.email], {
      type: "text/plain",
    }),
    ""
  );
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
}): Promise<RequestResponse<null, undefined>> {
  return getResponse(
    axios.post(
      `http://${config.backend.ip}:${config.backend.port}/logout`,
      undefined,
      {
        headers: {
          Authorization: getToken(cookies),
          Accept: "application/json",
        },
      }
    )
  );
}

export async function registerRegularUser(
  newUserInfo: IRegisterRegularUserInformation
): Promise<RequestResponse<null, undefined>> {
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
