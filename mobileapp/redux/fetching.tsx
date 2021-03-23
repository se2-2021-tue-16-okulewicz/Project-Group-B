import config from "../config/config";
import axios from "react-native-axios";
import _ from "lodash";

/**
 * Log into an account
 */
export async function logIn(email: string, encryptedPassword: string) {
  const url = `http://${config("backend.ip")}:${config(
    "backend.port"
  )}/account/login`;
  return fetch(url,
    {
      method: 'POST',
      headers: {
        password: 'Why we have to do this',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: encryptedPassword,
      })
    }

  )
    .then((response: any) => {
      // get the response body
      return {
        token: response.data,
        code: response.status,
      };
    })
    .catch((error: any) => {
      if (error.response)
        return {
          code: 0,
          body: { errorMessage: `${error.response.name} - ${error.response.message}` },
        };

      return { code: error.response.status, body: error.response.data };
    });
}

