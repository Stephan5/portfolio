import axios from "axios";
import { parseError } from "commons/utils";

const starlingUrl = (path) => {
  return "https://tdhwn6aiki.execute-api.eu-west-1.amazonaws.com/prod/" + path;
};

const headers = {
  Accept: "application/json"
};

export const getBalance = (accessToken) => {
  return axios({
    method: "post",
    url: starlingUrl("token"),
    data: { accessToken },
    headers
  }).catch(parseError);
};
