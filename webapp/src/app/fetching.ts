import { ILostDog, IPicture, ILostDogWithPicture } from "../dog/dogInterfaces";
import type { APIResponse } from "./response";
import config from "../config/config";
import _ from "lodash";
import axios from "axios";

const getToken: () => string = () => {
  return config("tokens.regular");
};

//ip and port should be in service worker file
export async function addDog(
  dog: ILostDog,
  picture: IPicture
): Promise<APIResponse<ILostDogWithPicture>> {
  let formData = new FormData();
  formData.append(
    "dog",
    new Blob([JSON.stringify(dog)], { type: "application/json" }),
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
      return response.data as APIResponse<ILostDogWithPicture>;
    })
    .catch((response) => {
      if (response instanceof TypeError)
        return {
          message: "Connection error",
          successful: false,
          data: null,
        };

      return response.data as APIResponse<ILostDogWithPicture>;
    });
}
