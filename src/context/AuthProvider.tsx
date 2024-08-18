import React, {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { UserModel } from "../models/UserModel";

interface AuthModel {
  id: number | null;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string | null;
  refreshToken: string | null;
}
interface UserState {
  user: UserModel;
  loading: boolean;
  error: string | null;
}

interface UserActions {
  type: "FETCH_USER_SUCCESS" | "FETCH_USER_FAILURE";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

const initialUserState: UserState = {
  user: {
    id: 1,
    lastName: "Johnson",
    firstName: "Emily",
    age: 28,
    gender: "female",
    email: "emily.johnson@x.dummyjson.com",
    phone: "+81 965-431-3024",
    username: "emilys",
    password: "emilyspass",
    birthDate: "1996-5-30",
    image: "...",
    address: {
      address: "626 Main Street",
      city: "Phoenix",
      state: "Mississippi",
      stateCode: "MS",
      postalCode: "29112",
      coordinates: {
        lat: -77.16213,
        lng: -92.084824,
      },
      country: "United States",
    },
    bank: {
      cardExpire: "03/26",
      cardNumber: "9289760655481815",
      cardType: "Elo",
      currency: "CNY",
      iban: "YPUXISOBI7TTHPK2BR3HAIXL",
    },
    ein: "977-175",
    ssn: "900-590-289",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
    role: "admin",
  },
  loading: true,
  error: null,
};

const UserReducer = (state: UserState, action: UserActions): UserState => {
  switch (action.type) {
    case "FETCH_USER_SUCCESS":
      return { ...state, user: action.payload, loading: false };
    case "FETCH_USER_FAILURE":
      return { ...state, error: action.payload.message, loading: false };
    default:
      return state;
  }
};

interface AuthContextType {
  auth: AuthModel;
  setAuth: React.Dispatch<React.SetStateAction<AuthModel>>;
  loading: boolean;
  userState: UserState;
  userDispatch: React.Dispatch<UserActions>;
}

export const AuthContext = createContext<AuthContextType>({
  auth: {
    id: null,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    image: "",
    token: null,
    refreshToken: null,
  },
  setAuth: () => {}, // Dummy function, will be replaced by actual setter
  loading: true,
  userState: initialUserState,
  userDispatch: () => {}, // Dummy function, will be replaced by actual dispatch
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel>({
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
  const [loading, setLoading] = useState<boolean>(true);

  const [userState, userDispatch] = useReducer(UserReducer, initialUserState);

  useEffect(() => {
    const authValue = localStorage.getItem("auth");
    if (authValue) {
      setAuth(JSON.parse(authValue));
    }
    setLoading(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loading, userState, userDispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
