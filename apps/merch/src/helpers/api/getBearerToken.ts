
import axios from "axios";
import { Response, ResponseType } from "@merch-types"

 //read nft mint address from wallet
export const getBearerToken = async (): Promise<Response | void> => {

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://slimes.expapi.link/token',
    headers: { 
      'access_token': process.env.apiKey
    }
  };

  let value = {
    type: ResponseType.Fail,
    data: "Error"
  }
  
  axios.request(config)
  .then((response) => {
    // console.log("getApiToken Success : ", response.data);
    value.type = ResponseType.Success;
    value.data = response.data;
    return value
  })
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : "Unable to load tokens"
    console.error("getApiToken Error : ",   message);
    value.data = message
    return value
  })

  
};  