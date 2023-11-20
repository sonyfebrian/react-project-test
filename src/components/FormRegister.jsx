import { Link } from "react-router-dom";

import Button from "./ui/Button";
import Input from "./ui/Input";
import Label from "./ui/Label";

export const FormRegister = () => {
  return (
    <>
      {" "}
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gradient-to-r from-rose-100 to-teal-100">
        <h3 className="text-4xl font-bold">Register</h3>

        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form>
            <Label htmlFor="email">Email</Label>
            <Input type="text" name="email" className="w-full" />
            <Label htmlFor="password" className="mt-4">
              Password
            </Label>

            <Input type="text" name="password" className="w-full" />

            <div className="flex items-center mt-4">
              <Button className="w-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
                Register
              </Button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            Already have an account?{" "}
            <span className="text-purple-600 hover:underline">
              <Link to="/">Log in</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
