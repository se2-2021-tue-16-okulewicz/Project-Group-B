import { ILostDog, IPicture, ILostDogWithPicture } from "../dog/dogInterfaces";
import type { APIResponse, RequestResponse } from "./response";
import config from "../config/config";
import axios from "axios";

const getToken: () => string = () => {
  return config("tokens.regular");
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

export async function addDog(
  dog: ILostDog,
  picture: IPicture
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

  return axios
    .post(
      `http://${config("backend.ip")}:${config("backend.port")}/lostdogs`,
      formData,
      {
        headers: {
          token: getToken(),
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      console.log(response);
      return {
        code: response.status,
        response: response.data as APIResponse<ILostDogWithPicture>,
      };
    })
    .catch((error) => {
      if (error instanceof TypeError)
        return {
          code: 0,
          response: {
            message: "Connection error",
            successful: false,
            data: null,
          },
        };

      let response = error.response;
      return {
        code: response.status,
        response: response.data as APIResponse<ILostDogWithPicture>,
      };
    });
}
