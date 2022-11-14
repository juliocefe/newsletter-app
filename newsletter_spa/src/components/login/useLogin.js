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
        console.log(response.data)
        activateAuth(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.data.detail);
        }
        console.log(error);
      });
  };

  return {
    username,
    password,
    authenticate,
  };
};
