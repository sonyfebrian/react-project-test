import { FormLogin } from "src/components/FormLogin";
import Logo from "src/assets/logo.webp";

export const Home = () => {
  return (
    <>
      <section className="h-full bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="container px-5 py-24 mx-auto">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      <div className="text-center">
                        <img className="mx-auto w-48" src={Logo} alt="logo" />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          We are The Infinity Team
                        </h4>
                      </div>

                      <FormLogin />
                    </div>
                  </div>

                  <div className="flex items-center rounded-b-lg bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-xl font-semibold">
                        We are more than just a company
                      </h4>
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
