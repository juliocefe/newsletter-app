import axios from "/src/libs/http";

export const getNewsLetters = (controller) => {
  const url = "/newsletters/";
  return axios.get(url, { signal: controller.signal });
};
