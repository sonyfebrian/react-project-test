import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  loginUser,
  loginSelector,
  clearState,
} from "src/store/slices/LoginSlice";
import { useDispatch, useSelector } from "react-redux";

import Button from "./ui/Button";
import Label from "./ui/Label";

export const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(loginSelector);
  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(errorMessage, "cek error");
      dispatch(clearState());
    }

    if (isSuccess) {
      console.log(isSuccess);
      dispatch(clearState());
      navigate("/register");
    }
  }, [dispatch, navigate, isError, isSuccess, errorMessage]);
  console.log(isError, "cek error");
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="mb-4">Please login to your account</p>
        <Label>Email</Label>
        <input
          type="text"
          placeholder="Email"
          className="mb-4 w-full px-3 py-2 border rounded-md"
          {...register("email", {
            pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
          })}
        />

        <Label>Password</Label>
        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full px-3 py-2 border rounded-md"
          {...register("password", { required: true })}
        />

        <div className="mb-12 pb-1 pt-1 text-center">
          {isFetching ? (
            <Button
              type="submit"
              className="w-full text-white"
              style={{
                background:
                  "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
              }}
            >
              Log in
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full text-white"
              style={{
                background:
                  "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
              }}
            >
              Log in
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between pb-6">
          <p className="mb-0 mr-2">Dont have an account?</p>
          <Link to="/register">
            <Button
              type="button"
              className="text-danger border-2 border-danger"
            >
              Register
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};
