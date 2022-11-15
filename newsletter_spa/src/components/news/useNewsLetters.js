import { useEffect, useState } from "react";
import { getNewsLetters } from "./services";

export const useNewsLetters = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsLetters, setNewsLetters] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchNewsLetters(controller);
    return () => {
      controller.abort();
    };
  }, []);

  const fetchNewsLetters = async (controller) => {
    setIsLoading(true);
    return getNewsLetters(controller)
      .then(({ data }) => {
        setNewsLetters(data.newsletters);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    fetchNewsLetters,
    newsLetters,
    isLoading
  };
};
