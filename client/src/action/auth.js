import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_FAILED,
  LOAD_USER,
  AUTH_ERROR,
  LOG_OUT,
} from "../constants/constants.js";
import axios from "axios";
import { setToken } from "../setToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"));
  }
  try {
    const response = await axios.get("/api/users");
    dispatch({
      type: LOAD_USER,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
  }
};

export const registerUser = (email, password, fname, lname) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password, fname, lname });
    const response = await axios.post(
      "/api/users/register",
      body,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: REGISTER_FAILED,
      payload: error,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    const response = await axios.post(
      "/api/users/login",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
   

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: error,
    });
   return error;
  
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({
    type: LOG_OUT
  })

}

