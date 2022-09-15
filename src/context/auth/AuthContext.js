import { useContext, useEffect } from "react";
import { createContext, useReducer } from "react";
import authReducer from "./authReducer";

const initialState = {
  loading: false,
  error: null,
  user: JSON.parse(localStorage.getItem("currentUser")),
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(state?.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
