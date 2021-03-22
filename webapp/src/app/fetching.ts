import { ILostDog, IPicture, ILostDogWithPicture } from "../dog/dogInterfaces";
import type { APIResponse } from "./response";
import config from "../config/config";
import _ from "lodash";
import axios from "axios";
import FormData from "form-data";
import { formDataToBuffer } from "./utility";

const getToken: () => string = () => {
  return config("tokens.regular");
};

//ip and port should be in service worker file
export async function addDog(
  dog: ILostDog,
  picture: IPicture
): Promise<APIResponse<ILostDogWithPicture>> {
  let formData = new FormData();
  formData.append("dog", JSON.stringify(dog), {
    filename: "",
    contentType: "application/json",
  });
  formData.append("picture", new Blob([picture.data.buffer]), {
    filename: picture.fileName,
    contentType: "application/octet-stream",
  });

  let formDataToBufferObject = formDataToBuffer(formData);

  return axios
    .post(
      `http://${config("backend.ip")}:${config("backend.port")}/lostdogs`,
      formDataToBufferObject,
      formData.getHeaders()
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
