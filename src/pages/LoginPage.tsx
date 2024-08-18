import { FaOpencart } from "react-icons/fa";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import { toast } from "react-toastify";
import { useLoading } from "../hooks/useLoading";
import LoadingScreen from "./LoadingScreen";
import axiosApi from "../api/axios-api";

const LoginPage = () => {
  const { setAuth, userDispatch } = useAuthContext();
  const { loadingState, loadingDispatch } = useLoading();
  const [username, setUsername] = useState<string>("emilys");
  const [password, setPassword] = useState<string>("emilyspass");
  const [errorMsg, setErrorMsg] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(false);

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      setErrorMsg("Please enter both username and password");
      if (errRef.current) errRef.current.focus();
    }
    loadingDispatch({ type: "SHOW_LOADING" });

    await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.message) {
          setErrorMsg(data.message);
          console.log(data.message);
          if (errRef.current) {
            errRef.current.focus();
          }
          toast.error("Login failed..!");
        } else {
          setAuth(data);
          fetchUserData(data.id);
          localStorage.setItem("auth", JSON.stringify(data));
          setUsername("");
          setPassword("");
          toast.success("Login Success..!");
          navigate(from, { replace: true });
        }
        console.log(data);
        loadingDispatch({ type: "HIDE_LOADING" });
      })
      .catch((error) => {
        console.log(error);
        if (errRef.current) {
          errRef.current.focus();
        }
        toast.error("Login failed..!");
        setErrorMsg("Login Failed..!");
        loadingDispatch({ type: "HIDE_LOADING" });
      });
  };

  const fetchUserData = async (id: number) => {
    try {
      await axiosApi
        .get(`https://dummyjson.com/users/${id}`)
        .then((resp) => {
          console.log(resp.data);
          userDispatch({ type: "FETCH_USER_SUCCESS", payload: resp.data });
        })
        .catch((err) => {
          console.log(err);
          userDispatch({ type: "FETCH_USER_FAILURE", payload: err });
        });
    } catch (error) {
      console.log(error);
      userDispatch({ type: "FETCH_USER_FAILURE", payload: error });
    } finally {
      loadingDispatch({ type: "HIDE_LOADING" });
    }
  };

  return (
    <div className="flex w-full h-[90vh]">
      <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-gray-200">
        <FaOpencart size={128} className="text-purple-600" />
        <div className="w-48 h-1 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 "></div>
      </div>
      <div className="w-full m-5 md:m-0 flex items-center justify-center lg:w-1/2">
        <div className="w-full bg-white rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Welcome to Shop 24/7
            </h1>
            <h3 className="text-md font-medium text-center mt-2 leading-tight tracking-tight text-gray-900 md:text-lg dark:text-white">
              Sign in to your account
            </h3>
            <p
              ref={errRef}
              className={
                errorMsg
                  ? "flex gap-3 items-center justify-center p-3 bg-red-100 text-red-500 font-medium text-lg rounded-md w-full"
                  : "hidden"
              }
            >
              <MdError size={28} /> {errorMsg}
            </p>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div>
                <label
                  id="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <label
                  id="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                  required
                />
              </div>
              <div className="flex items-center justify-end">
                <a
                  href="#"
                  className="text-sm font-medium text-purple-600 hover:underline dark:text-purple-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className={`w-full text-white font-bold rounded-lg text-lg px-5 py-2.5 text-center ${
                  loadingState?.isLoading || !isFormValid
                    ? "bg-purple-400 cursor-not-allowed"
                    : " bg-purple-600 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform"
                }`}
                disabled={loadingState?.isLoading || !isFormValid}
              >
                {loadingState?.isLoading ? (
                  // <ImSpinner className="text-xl text-center m-auto animate-spin" />
                  <LoadingScreen />
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
