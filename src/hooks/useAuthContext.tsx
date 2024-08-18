import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  useDebugValue(context.auth, (auth) =>
    auth?.token ? "Logged In" : "Logged Out"
  );
  return context;
};

export default useAuthContext;
