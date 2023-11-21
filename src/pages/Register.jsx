import { Link } from "react-router-dom";
import { FormRegister } from "src/components/FormRegister";
import Logo from "src/assets/logo.webp";

export const Register = () => {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gradient-to-r from-rose-100 to-teal-100">
        <img className="mx-auto w-48" src={Logo} alt="logo" />
        <h3 className="text-4xl font-bold">Register</h3>

        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <FormRegister />
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
