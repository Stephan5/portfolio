import axios from "axios";
import { parseError } from "commons/utils";
import { GITHUB_REPO_NAME, GITHUB_USER_NAME } from "commons/constants";

export const headers = {
  Accept: "application/json"
};

export const getRepoDetails = () => {
  return axios({
    method: "get",
    url: `https://api.github.com/repos/${GITHUB_USER_NAME}/${GITHUB_REPO_NAME}`,
    headers
  }).catch(parseError);
};
