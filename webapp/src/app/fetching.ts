var requestify = require("requestify");
import * as Utility from "./utility";
//import axios from "axios";
import _ from "lodash";
const http = require("http");

/**
 * Add dog
//ip and port should be in service worker file
export async function addDogs(dog : LostDog, picture : Picture, token:any) {
  return requestify
    .request(`http://${config("backend.ip")}:${config("backend.port")}/${id}`, {
      method: `POST`,
      body: [
        {
            dog
        },
        {
          filename: picture.state.filename,
          filetype: picture.state.filetype,
           data: picture.state.data
        }
      ],

    })
    .then((response) => {
      return {
        code: response.getCode(),
        body: response
          .getBody()
          .split(",")
          .map((id) => parseInt(id)),
      };
    })
    .catch((response) => {
      if (response instanceof TypeError)
        return {
          code: 0,
          body: { errorMessage: `${response.name} - ${response.message}` },
        };

      return { code: response.getCode(), body: response.getBody() };
    });
} 
*/
