import axios from "axios";
import { parseError } from "commons/utils";

export const headers = {
  Accept: "application/json",
  "X-Mashape-Key": "xmkYpiS6y4mshn17SxhVeof2CP5tp1Gk3xIjsnd17lcECbf7i2"
};

export const fetchQuote = () => {
  return axios({
    method: "get",
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1",
    headers
  }).catch(parseError);
};
