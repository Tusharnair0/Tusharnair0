import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { staffReducer } from "../reducers/staffReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constant";
import { useNavigate } from "react-router-dom";

export const StaffContext = createContext();

const StaffContextProvider = ({ children }) => {
  let navigate = useNavigate();
  const [staffState, dispatch] = useReducer(staffReducer, {
    staffLoading: true,
    staffList: [],
  });

  const getAllUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/staff/all`);
      if (response.data.success)
      {
        console.log(response.data)
        dispatch({
          type: "SET_ALL_USER",
          payload: { staffList: response.data.staffs },
        });
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  }

  const updateUsers = async (updateUser) => {
    try {
      const response = await axios.put(`${apiUrl}/staff/${updateUser.id}`, {
        password: updateUser.password
      });
      if (response.data.success)
      {
        navigate("/staffs", { replace: true });
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  }

  const deleteUsers = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/staff/${id}`);
      if (response.data.success)
      {
        dispatch({
          type: "SET_DELETE_USER",
          payload: response.data.users,
        });
      }
    } catch (error) {
      console.log(error)
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  }

  // register
  const regisUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/staff/register`, userForm);
      if (response.data.success)
        {
            dispatch({
                type: "SET_NEW_USER",
                payload: response.data.push
            })
            navigate("/staffs", {replace: true})
        }

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };


  useEffect(() => getAllUser(), []);

  // Context data
  const staffContextData = { deleteUsers, updateUsers, regisUser, staffState, getAllUser };

  // return provider
  return (
    <StaffContext.Provider value={staffContextData}>
      {children}
    </StaffContext.Provider>
  );
};

export default StaffContextProvider;
