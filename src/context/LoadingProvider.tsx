import React, { createContext, ReactNode, useReducer } from "react";

interface LoadingState {
  isLoading: boolean;
}

interface LoadingAction {
  type: "SHOW_LOADING" | "HIDE_LOADING";
}

const initialState: LoadingState = {
  isLoading: false,
};

const loadingReducer = (
  state: LoadingState,
  action: LoadingAction
): LoadingState => {
  switch (action.type) {
    case "SHOW_LOADING":
      return { ...state, isLoading: !state.isLoading ? true : true };
    case "HIDE_LOADING":
      return { ...state, isLoading: state.isLoading ? false : false };
    default:
      return state;
  }
};

export const LoadingContext = createContext<
  | {
      loadingState: LoadingState;
      loadingDispatch: React.Dispatch<LoadingAction>;
    }
  | undefined
>(undefined);

const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loadingState, loadingDispatch] = useReducer(
    loadingReducer,
    initialState
  );
  return (
    <LoadingContext.Provider value={{ loadingState, loadingDispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
