import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  signupSelector,
  signupUser,
  clearState,
} from "src/store/slices/RegisterSlice";
import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { HiEye, HiEyeOff } from "react-icons/hi";

import Button from "./ui/Button";
import Label from "./ui/Label";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});

export const FormRegister = () => {
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
    useSelector(signupSelector);
  const onSubmit = (data) => {
    dispatch(signupUser(data));
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
      dispatch(clearState());
      Swal.fire({
        text: "Register success please log in",
        icon: "success",
      });
      navigate("/");
    }
  }, [dispatch, navigate, isError, isSuccess, errorMessage]);
  return (
    <>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="email">Email</Label>
        <input
          type="text"
          name="email"
          className="mb-4 w-full px-3 py-2 border rounded-md"
          {...register("email", {
            pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
          })}
        />
        <p className="text-red-600 mb-2 font-light">{errors.email?.message}</p>
        <Label htmlFor="email">Password</Label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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

        <div className="flex items-center mt-4">
          {isFetching ? (
            <Button
              className="w-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"
              type="submit"
            >
              Register
            </Button>
          ) : (
            <Button
              className="w-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"
              type="submit"
            >
              Register
            </Button>
          )}
        </div>
      </form>
    </>
  );
};
