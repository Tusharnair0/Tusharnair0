import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { authReducer } from "../Reducer/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constant";
import setAuthToken from "../utils/setAuthToken";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  let navigate = useNavigate();
  let location = useLocation();
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: "",
  });

  // Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.post(`${apiUrl}/customer`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.customer },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
      if (location.pathname === "/register") {
        navigate("/register", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  };

  useEffect(() => loadUser(), []);

  // login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/customer/login`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // register
  const regisUser = async (userForm) => {
    try {
      const response = await axios.post(
        `${apiUrl}/customer/register`,
        userForm
      );
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  //logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
    navigate("/login", { replace: true });
  };

  // Context data
  const authContextData = { loginUser, logoutUser, regisUser, authState };

  // return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
