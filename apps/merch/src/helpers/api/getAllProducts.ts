import axios from "axios";
import { Response, ResponseType } from "@merch-types";

//get user session
export const getAllProducts = async (
  token: string,
): Promise<Response> => {

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://slimes.expapi.link/products`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let value = {
    type: ResponseType.Fail,
    data: "Error",
  };

  await axios
    .request(config)
    .then((response) => {
      // console.log("getAllProducts Success : ", response.data);
      value.type = ResponseType.Success;
      value.data = response.data;
     
    })
    .catch((error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Unable to load tokens";
      console.error("getAllProducts Error : ", message);
      value.data = message;
    }); 

  return value;
};
