import { useFormInput } from "/src/hooks/InputHook";
import { getTopics, getRecipients, saveNewsLetter } from "./services";
import { useEffect, useState } from "react";

export const useNewsLetter = () => {
  const [submiting, setSubmiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [file, setFile] = useState();
  const title = useFormInput("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedRecipients, setSelectedRecipients] = useState([])

  const fileHandleChange = (e) => {
    setFile(e.target.files[0])
  }

  const selectRecipients = (recipients) => {
    setSelectedRecipients(recipients);
  };

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
    const controller = new AbortController();
    loadTopicsAndRecipients(controller)
    return () => {
      controller.abort()
    }
  }, []);

  const submit = async () => {
    setSubmiting(true);
    const formData = new FormData();
    formData.append("file", file)
    formData.append("title", title.value)
    formData.append("topic", selectedTopic.id)
    formData.append("items", JSON.stringify(recipients))
    return saveNewsLetter(formData)
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
    fileHandleChange,
    selectRecipients,
    setSelectedTopic,
    file,
    title,
    topics,
    selectedTopic,
    selectedRecipients,
    recipients,
    isLoading,
    submiting,
  };
};
