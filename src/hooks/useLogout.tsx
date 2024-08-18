import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("auth");
    setAuth({
      id: null,
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      image: "",
      token: null,
      refreshToken: null,
    });
    navigate("/login");
  };
  return logout;
};

export default useLogout;
