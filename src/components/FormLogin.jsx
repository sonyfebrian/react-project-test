import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  loginUser,
  loginSelector,
  clearState,
} from "src/store/slices/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { HiEye, HiEyeOff } from "react-icons/hi";

import Button from "./ui/Button";
import Label from "./ui/Label";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});

export const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
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
      navigate("/blog");
    }
  }, [dispatch, navigate, isError, isSuccess, errorMessage]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="mb-4">Please login to your account</p>
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          className="mb-4 w-full px-3 py-2 border rounded-md"
          {...register("email", {
            pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
          })}
        />
        <p className="text-red-600 mb-2 font-light">{errors.email?.message}</p>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            className="mb-4 w-full px-3 py-2 border rounded-md pr-10"
            {...register("password", { required: true })}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex mt-4 mr-2 px-1 focus:outline-none"
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </button>
          <p className="text-red-600 mb-2 font-light">
            {errors.password?.message}
          </p>
        </div>
        <div className="mb-12 pb-1 pt-1 text-center">
          {isFetching ? (
            <Button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900"
            >
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900"
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
