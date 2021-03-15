import requestify from "requestify";
//import config from "../config/config";
import * as Utility from "./utility";
import axios from "axios";
import _ from "lodash";
const http = require("http");
//Doc for response
/**
 * @typedef {Object} Response<BodyType> Respnse from server
 * @property {BigInt} code Status code
 * @property {BodyType} body Payload depending on function and result
 */

//Typedefs for body types of the responses
/**
 * @typedef {Object} Car
 * @typedef {Object} ErrorMessage
 * @typedef {Object} ImageData
 */




/**
 * Post(register) an account
 */
export async function addCars(car, token) {
  return requestify
    .request(`http://${config("backend.ip")}:${config("backend.port")}/cars`, {
      method: `POST`,
      headers: {
        password: `Why we have to do this`,
        token: token,
      },
      body: [
        {
          name: car.name,
          model: car.model,
          location: car.location,
          startDateTime: car.startDateTime,
          endDateTime: car.endDateTime,
          status: car.status,
          dailyPrice: car.dailyPrice,
          description: car.description,
          tags: car.tags,
          plateNumber: car.plateNumber,
        },
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



/**
 * Uploads a car image
 * @param {File} file
 * @param {BigInt} id - id of the car
 * @param {string} token
 */
export async function uploadCarImage(file, id, token) {
  const fd = new FormData();
  fd.append("file", file);
  return Promise.all([
    axios.post(
      `http://${config("backend.ip")}:${config(
        "backend.port"
      )}/cars/${id}/image`,
      fd,
      {
        headers: {
          password: `Why we have to do this`,
          token: token,
          "Content-Type": "multipart/form-data",
        },
      }
    ),
    Utility.fileToBase64(file),
  ])
    .then((responses) => {
      return {
        code: responses[0].status,
        image: responses[1],
        id,
      };
    })
    .catch((error) => {
      if (!error.response)
        return {
          code: 0,
          body: {
            errorMessage:
              "Unknown error, check you connection and then contact administrators",
            error,
          },
        };

      return {
        code: _.get(error, "response.status", 0),
        body: {
          ..._.get(error, "response.data", {}),
        },
      };
    });
}

