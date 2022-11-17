import { useContext } from "react";
import { useFormInput } from "/src/hooks/InputHook";
import axios from "/src/libs/http";
import { Context } from "/src/Context";

export const useLogin = () => {
  const { activateAuth } = useContext(Context);
  const username = useFormInput("");
  const password = useFormInput("");

  const authenticate = () => {
    const url = "/token-auth/";
    axios
      .post(url, {
        username: username.value,
        password: password.value,
      })
      .then((response) => {
        activateAuth(response.data);
      })
      .catch((error) => {
        alert("Todo: add the error handling for errors in general");
        console.log(error);
      });
  };

  return {
    username,
    password,
    authenticate,
  };
};
