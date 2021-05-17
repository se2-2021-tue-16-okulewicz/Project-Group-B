import config from "../config/config";
import axios, { AxiosResponse } from "axios";
import _ from "lodash";
import {
  ILoginInformation,
  ILoginResults,
} from "../components/loginRegisterInterfaces";
import { APIResponse, RequestResponse } from "./response";
import { ILostDog, ILostDogWithPicture, IPicture } from "../components/dogs/dog/dogInterfaces";
import { IRegisterRegularUserInformation } from "../components/register-login/loginRegisterInterfaces";

async function getResponse<T>(
  axiosRequest: Promise<AxiosResponse<any>>
): Promise<RequestResponse<T>> {
  try {
    const response = await axiosRequest;
    console.log(response.status);
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
  Authorization: { [name: string]: any }
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
          Authorization: Authorization,
        },
      }
    )
  );
}

export async function markLostDogAsFound(
  dogId: number,
  Authorization: { [name: string]: any }
): Promise<RequestResponse<ILostDogWithPicture[]>> {
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

export async function addDog(
  dog: ILostDog,
  picture: IPicture,
  Authorization: string
): Promise<RequestResponse<ILostDogWithPicture>> {
  let formData = new FormData();

  // const privateProperties = ["id", "pictureId", "ownerId"];
  // const excludePrivateProperties = (key: string, value: any) =>
  //   privateProperties.includes(key) ? undefined : value;

    /*id: 0,
  ownerId: 0,
  pictureId: 0,
  name: "",
  breed: "",
  age: 0,
  hairLength: "",
  color: "",
  size: "",
  earsType: "",
  tailLength: "",
  specialMark: "",
  behaviors: [],
  location: { city: "", district: "" },
  dateLost: new Date(2012, 1, 1, 0, 0, 0, 0),
  isFound: false, */
  
  //formData.append("dog[id]", dog.id.toString());
  //formData.append("dog[ownerId]",dog.ownerId.toString());
  //formData.append("dog[pictureId]",dog.pictureId.toString());
  console.log(JSON.stringify(dog.breed));
  console.log(dog.breed.toString());
  formData.append("dog[name]",JSON.stringify(dog.name));
  formData.append("dog[breed]",JSON.stringify(dog.breed));
  formData.append("dog[age]",JSON.stringify(dog.age));
  formData.append("dog[hairLength]",JSON.stringify(dog.hairLength));
  formData.append("dog[color]",JSON.stringify(dog.color));
  formData.append("dog[size]",JSON.stringify(dog.size));
  formData.append("dog[earsType]",JSON.stringify(dog.earsType));
  formData.append("dog[tailLength]",JSON.stringify(dog.tailLength));
  formData.append("dog[specialMark]",JSON.stringify(dog.specialMark));
  formData.append("dog[behaviors]",JSON.stringify(dog.behaviors));
  formData.append("dog[location[city]]",JSON.stringify(dog.location.city));
  formData.append("dog[location[district]]",JSON.stringify(dog.location.district));
  formData.append("dog[dateLost]",JSON.stringify(dog.dateLost));
  formData.append("dog[isFound]",JSON.stringify(dog.isFound));

  formData.append("picture[id]",JSON.stringify(picture.id));
  formData.append("picture[fileName]",JSON.stringify(picture.fileName));
  formData.append("picture[fileType]",JSON.stringify(picture.fileType));
  formData.append("picture[data]",JSON.stringify(picture.data));
  console.log("fetch!");
  // formData.append('dog', {
  //   "string": JSON.stringify(dog), //This is how it works :)
  //   type: 'application/json'
  // });

  // formData.append("picture", {
  //     id: picture.id,
  //     fileName: picture.fileName,
  //     fileType: picture.fileType,
  //     data: picture.data
  //   });



  //formData.append("dog",{"string": JSON.stringify(dog), type: "application/json"})
  // formData.append(
  //   "dog",
  //   new Blob([JSON.stringify(dog, excludePrivateProperties)], {
  //     type: "application/json",
  //   }),
  //   ""
  // );
  console.log("formData:"+ formData.get("dog"));
  // formData.append(
  //   "picture",
  //   new Blob([picture.data], { type: picture.fileType }),
  //   picture.fileName
  // );
  console.log("formData:"+ formData.get("picture"));

  return getResponse(
    axios.post(
      `http://192.168.1.15:${config.backend.port}/lostdogs`,
      formData,
      {
        headers: {
          Authorization: Authorization,
          Accept: "application/json",
        },
      }
    )
  );
}
