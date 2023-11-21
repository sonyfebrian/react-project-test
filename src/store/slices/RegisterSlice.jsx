/* eslint-disable react-refresh/only-export-components */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ email, password }, thunkAPI) => {
    try {
      let link = "https://reqres.in/api/register";
      const params = {
        email: email,
        password: password,
      };
      const response = await axios.post(link, params);
      let data = await response.data;
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: e.response.data.error,
      });
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const SignupSlice = createSlice({
  name: "signup",
  initialState: {
    token: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.token = payload.token;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.isFetching = true;
      });
  },
});

export const { clearState } = SignupSlice.actions;

export const signupSelector = (state) => state.signup;
