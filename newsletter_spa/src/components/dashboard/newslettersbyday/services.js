import axios from "/src/libs/http";

export const getNlsByTopicByLast7Days = (controller) => {
  const url = "/newsletters_by_day/";
  return axios.get(url, { signal: controller.signal });
};

export const getSubscriptionsByTopic = (controller) => {
  const url = "/subscriptions_by_topic/";
  return axios.get(url, { signal: controller.signal });
};