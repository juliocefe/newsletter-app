import { useContext, useState } from "react";
import { useFormInput } from "/src/hooks/InputHook";
import axios from "/src/libs/http";
import { Context } from "/src/Context";

export const useLogin = () => {
  const { activateAuth } = useContext(Context);
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState({noneFieldErrors: null, fields: {}})

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
        console.log(error);
        setError({
          noneFieldErrors: error.response.data.non_field_errors,
          fields: {...error.response.data}
        });
      });
  };

  return {
    username,
    password,
    authenticate,
    error
  };
};
