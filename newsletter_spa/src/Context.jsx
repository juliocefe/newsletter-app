import { createContext, useState } from "react";

export const Context = createContext();

function Provider({children}) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAuth = async () => {
    let storaged_user = window.localStorage.getItem("user");;
    if (storaged_user) {
      const user = JSON.parse(storaged_user);
      setUser(user);
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setIsLoading(false);
  };
  const value = {
    isAuth,
    activateAuth: async ({ token, user }) => {
      window.localStorage.setItem("user", JSON.stringify(user));
      window.localStorage.setItem("token", token);
      setUser(user);
      setIsAuth(true);  // TODO check if this is correct
    },
    logOut: async () => {
      window.localStorage.removeItem("token")
      window.localStorage.removeItem("user")
      setUser(null);
      setIsAuth(false);
    },
    isLoading,
    handleAuth,
    user,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default {
  Provider,
  Consumer: Context.Consumer,
};
