import axios from "axios";
import { Response, ResponseType, ShippingSession } from "@merch-types";

//get user session
export const updateUserSession = async (
  token: string,
  wallet: string,
  data: ShippingSession
): Promise<Response> => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://slimes.expapi.link/session/${wallet}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data : data
  };

  console.log("config ", config)

  let value = {
    type: ResponseType.Fail,
    data: "Error",
  };

  // console.log("updateUserSession ", data)

  await axios
    .request(config)
    .then((response) => {
      // console.log("updateUserSession Success : ", response.data);
      value.type = ResponseType.Success;
      value.data = response.data;
     
    })
    .catch((error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Unable to load tokens";
      console.error("updateUserSession Error : ", message);
      value.data = message;
    }); 

  // let config = {
  //   method: 'get',
  //   maxBodyLength: Infinity,
  //   url: 'https://slimes.expapi.link/session/8CB86XrUYijo45m5Hs4jqaM9daj48mXdqyCS42wS1Lvi',
  //   headers: { 
  //     'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpFaWFUY0pwWmxKV3o5M0lxQmowNyJ9.eyJpc3MiOiJodHRwczovL2Rldi04ajVxZHZoc20xdzAzYmYzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJrTWlVS2Z6ZU56U3dWNDFzT08yUUc1YXVUelBtS1d4OEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9zbGltZXMuZXhwYXBpLmxpbmsiLCJpYXQiOjE2ODg2NzcyNDUsImV4cCI6MTY4ODY4NDQ0NSwiYXpwIjoia01pVUtmemVOelN3VjQxc09PMlFHNWF1VHpQbUtXeDgiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.ohrE1FE_Q9GdRGuomTUmEdJGpMZaGxlxp-c2WkmiUR-j-kUY6mOb4KafLKql1IFH-TLOpx-9ZuSC4Y-hUo608jB37zrfEs4jFojv2aoE_6YoKhsFb6iIy_iMbDzLu0eqNNT3rHdANL4IqiThIj-Cmn5NUndLLJYokMtlncXuVkQgQeoytobZQOiKQU9cRZJa3lZehzhf1ppCxIgnzEVxyvq5IuGg1sxoS-g9uMYxE2YgK4A2_tRa2QF79pS9T1gQc_S_H1y_ZbUPeR0WDfzsHnYTWuKQYAe-HwNyxNxpjiitNHgrq9YY-ViU7nAvbavo1NSSVErDqbP7ig7wmsDAOw'
  //   }
  // };
  
  // await axios.request(config)
  // .then((response) => {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
    
  return value;
};
