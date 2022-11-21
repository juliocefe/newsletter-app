import { useEffect, useState } from "react";
import { getNlsByTopicByLast7Days, getSubscriptionsByTopic } from "./services";

function random_rgba() {
  // I don't understand how this works, and I don't care...
  // I'm joking, of course I know ... :$
  const o = Math.round,
    r = Math.random,
    s = 255;
  return `rgba(${o(r() * s)}, ${o(r() * s)}, ${o(r() * s)}, 1)`;
}

function generateDataForSubscriptionsByTopic(rawData, topicsColors) {
  const data = {
    labels: rawData.map((i) => i.name),
    datasets: [
      {
        label: "# of Subs",
        data: rawData.map((i) => i.total),
        backgroundColor: rawData.map((i) => topicsColors.get(i.name)),
      },
    ],
  };
  return data;
}

export const useDasboardData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nlByTopicByLast7Days, setNlByTopicByLast7Days] = useState([]);
  const [subscriptionsByTopic, setSubscriptionsByTopic] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchNewsLettersByDay(controller);
    return () => {
      controller.abort();
    };
  }, []);

  const fetchNewsLettersByDay = async (controller) => {
    // cache rgb colors, so we can not repeat some of them maybe?
    return Promise.all([
      getSubscriptionsByTopic(controller),
      getNlsByTopicByLast7Days(controller),
    ]).then(
      ([
        {
          data: { data: topicsSubs },
        },
        {
          data: { data: datasets },
        },
      ]) => {
        // first generate the map of topic: color
        const topicsColors = new Map();
        topicsSubs.forEach((topic) => {
          topicsColors.set(topic.name, random_rgba());
        });
        setSubscriptionsByTopic(
          generateDataForSubscriptionsByTopic(topicsSubs, topicsColors)
        );
        setNlByTopicByLast7Days({
          labels: datasets.labels,
          datasets: Object.entries(datasets.datasets).map(([i, value]) => {
            return { ...value, backgroundColor: topicsColors.get(value.label) };
          }),
        });
        setIsLoading(false);
      }
    ).catch(error => {
      if (!controller.signal.aborted) {
        console.log(error)
      }
    });
  };

  return {
    nlByTopicByLast7Days,
    subscriptionsByTopic,
    isLoading,
  };
};
