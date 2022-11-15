import { useFormInput } from "/src/hooks/InputHook";
import { getTopics, getRecipients, saveNewsLetter } from "./services";
import { useEffect, useState, useCallback } from "react";

export const useNewsLetter = () => {
  const [submiting, setSubmiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const file = useState();
  const title = useFormInput("");
  const selectedTopic = useFormInput(null);
  const selectedRecipients = useState([]);

  const loadTopicsAndRecipients = controller => {
    setIsLoading(true);
    Promise.all([getTopics(controller), getRecipients(controller)])
      .then(([{ data: topicsData }, { data: recipientsData }]) => {
        setTopics(topicsData.topics);
        setRecipients(recipientsData.recipients);
      })
      .catch((error) => {
        console.log(error)
        if (!controller.signal.aborted){
          alert("Error al cargar los datos", error.data);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    console.log("executing");
    const controller = new AbortController();
    loadTopicsAndRecipients(controller)
    return () => {
      controller.abort()
    }
  }, []);

  const submit = () => {
    setSubmiting(true);
    saveNewsLetter({
      file: file,
      title: title,
      topic: selectedTopic,
      recipients: selectedRecipients,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.detail);
      });
  };

  return {
    submit,
    topics,
    recipients,
    isLoading,
    submiting,
  };
};
