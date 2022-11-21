import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useFormInput } from "/src/hooks/InputHook";
import { getTopics, getRecipients, saveNewsLetter } from "./services";

export const useNewsLetter = () => {
  const [submiting, setSubmiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [file, setFile] = useState(null);
  const title = useFormInput("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [scheduledAt, setScheduledAt] = useState(dayjs());
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [errors, setErrors] = useState({noneFieldErrors: null, fields: {}})

  const fileHandleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const selectRecipients = (recipients) => {
    setSelectedRecipients(recipients);
  };

  const loadTopicsAndRecipients = (controller) => {
    setIsLoading(true);
    Promise.all([getTopics(controller), getRecipients(controller)])
      .then(([{ data: topicsData }, { data: recipientsData }]) => {
        setTopics(topicsData.topics);
        setRecipients(recipientsData.recipients);
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setErrors(error.response.data);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const controller = new AbortController();
    loadTopicsAndRecipients(controller);
    return () => {
      controller.abort();
    };
  }, []);
  
  const submit = async () => {
    setSubmiting(true);
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("title", title.value);
    if (selectedTopic?.id){
      formData.append("topic", selectedTopic.id);
    }
    formData.append("scheduled_at", scheduledAt.format("YYYY-MM-DDTH:mm"));
    formData.append("items", JSON.stringify(selectedRecipients));
    return saveNewsLetter(formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error.response.data);
        setSubmiting(false);
        return Promise.reject()
      });
  };

  return {
    submit,
    fileHandleChange,
    selectRecipients,
    setSelectedTopic,
    setScheduledAt,
    scheduledAt,
    file,
    title,
    topics,
    selectedTopic,
    selectedRecipients,
    recipients,
    isLoading,
    submiting,
    errors,
  };
};
