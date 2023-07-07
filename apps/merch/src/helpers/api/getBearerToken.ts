import axios from "axios";
import { Response, ResponseType } from "@merch-types";

//get bearer token for authentication
export const getBearerToken = async (): Promise<Response> => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://slimes.expapi.link/token",
    headers: {
      access_token: process.env.apiKey,
    },
  };

  let value = {
    type: ResponseType.Fail,
    data: "Error",
  };

  await axios
    .request(config)
    .then((response) => {
      // console.log("getBearerToken Success: ", response.data);
      value.type = ResponseType.Success;
      value.data = response.data;
    })
    .catch((error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Unable to load tokens";
      console.error("getBearerToken Error: ", message);
      value.data = message;
    });

    return value;
};
