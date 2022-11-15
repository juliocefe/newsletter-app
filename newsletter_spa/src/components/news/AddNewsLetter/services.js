import axios from "/src/libs/http";

export const saveNewsLetter = async (parmas) => {
  const url = "/newsletters/";
  return axios.post(url, { ...parmas });
};

export const getTopics = (controller) => {
  const url = "/topics/";
  return axios.get(url, { signal: controller.signal });
};

export const getRecipients = (controller) => {
  const url = "/recipients/";
  return axios.get(url, { signal: controller.signal });
};
