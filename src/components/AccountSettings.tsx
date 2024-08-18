import React from "react";
import { IoEyeOutline } from "react-icons/io5";

const AccountSettings: React.FC = () => {
  return (
    <div className="w-full p-4 mt-4 overflow-x-auto border rounded-md lg:mt-0 border-gray-200 bg-white sm:p-5 lg:py-8 2xl:py-10 lg:px-7 2xl:px-12">
      <div className="flex flex-col w-full">
        <h2 className="text-black text-base lg:text-lg xl:text-[20px] font-semibold xl:leading-8 mb-5 md:mb-6 lg:mb-7 lg:-mt-1">
          Personal Information
        </h2>
        <form
          className="flex flex-col justify-center w-full mx-auto"
          noValidate={false}
        >
          <div className="border-b border-border-base pb-7 md:pb-8 lg:pb-10">
            <div className="flex flex-col space-y-4 sm:space-y-5">
              <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
                <div className="w-full sm:w-1/2 px-1.5 md:px-2.5">
                  <label
                    htmlFor="firstName"
                    className="block font-normal text-sm leading-none mb-3 cursor-pointer text-black text-opacity-70"
                  >
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    placeholder=""
                    className="py-2 px-4 w-full appearance-none border text-sm lg:text-base rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-black focus:ring-0 focus:border-purple-400 focus:border-2 focus:outline-none  h-11 md:h-12"
                    autoComplete="off"
                    spellCheck="false"
                    aria-invalid="false"
                    type="text"
                    name="firstName"
                  />
                </div>
                <div className="w-full sm:w-1/2 px-1.5 md:px-2.5">
                  <label
                    htmlFor="lastName"
                    className="block font-normal text-sm leading-none mb-3 cursor-pointer text-black text-opacity-70"
                  >
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    placeholder=""
                    className="py-2 px-4 w-full appearance-none border text-sm lg:text-base rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-black focus:ring-0 focus:border-purple-400 focus:border-2 focus:outline-none  h-11 md:h-12"
                    autoComplete="off"
                    spellCheck="false"
                    aria-invalid="false"
                    type="text"
                    name="lastName"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
                <div className="w-full sm:w-1/2 px-1.5 md:px-2.5">
                  <label
                    htmlFor="phoneNumber"
                    className="block font-normal text-sm leading-none mb-3 cursor-pointer text-black text-opacity-70"
                  >
                    Phone/Mobile *
                  </label>
                  <input
                    id="phoneNumber"
                    placeholder=""
                    className="py-2 px-4 w-full appearance-none border text-sm lg:text-base rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-black focus:ring-0 focus:border-purple-400 focus:border-2 focus:outline-none  h-11 md:h-12"
                    autoComplete="off"
                    spellCheck="false"
                    aria-invalid="false"
                    type="tel"
                    name="phoneNumber"
                  />
                </div>
                <div className="w-full sm:w-1/2 px-1.5 md:px-2.5">
                  <label
                    htmlFor="email"
                    className="block font-normal text-sm leading-none mb-3 cursor-pointer text-black text-opacity-70"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    placeholder=""
                    className="py-2 px-4 w-full appearance-none border text-sm lg:text-base rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-black focus:ring-0 focus:border-purple-400 focus:border-2 focus:outline-none  h-11 md:h-12"
                    autoComplete="off"
                    spellCheck="false"
                    aria-invalid="false"
                    type="email"
                    name="email"
                  />
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-black text-base lg:text-lg xl:text-[20px] font-semibold xl:leading-8 pt-6 mb-5 xl:mb-8 md:pt-7 lg:pt-8">
            Account Information
          </h2>
          <div className="border-b border-border-base pb-7 md:pb-9 lg:pb-10">
            <div className="flex flex-col space-y-4 sm:space-y-5">
              <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
                <div className="w-full sm:w-1/2 px-1.5 md:px-2.5">
                  <label
                    htmlFor="username"
                    className="block font-normal text-sm leading-none mb-3 cursor-pointer text-black text-opacity-70"
                  >
                    Username *
                  </label>
                  <input
                    id="username"
                    placeholder=""
                    className="py-2 px-4 w-full appearance-none border text-sm lg:text-base rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-black focus:ring-0 focus:border-purple-400 focus:border-2 focus:outline-none  h-11 md:h-12"
                    autoComplete="off"
                    spellCheck="false"
                    aria-invalid="false"
                    type="text"
                    name="username"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
                <div className="w-full sm:w-1/2 px-1.5 md:px-2.5">
                  <label
                    htmlFor="password"
                    className="block mb-3 text-sm font-normal leading-none cursor-pointer text-black opacity-70"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      className="py-2 px-4 w-full appearance-none border text-sm lg:text-base rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-black focus:ring-0 focus:border-purple-400 focus:border-2 focus:outline-none  h-11 md:h-12"
                      autoComplete="off"
                      spellCheck="false"
                      type="password"
                      name="password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute -mt-2 cursor-pointer right-4 top-5 text-gray-900 text-opacity-30"
                    >
                      <IoEyeOutline size={24} />
                    </label>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 px-1.5 md:px-2.5">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-3 text-sm font-normal leading-none cursor-pointer text-black opacity-70"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      className="py-2 px-4 w-full appearance-none border text-sm lg:text-base rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-black focus:ring-0 focus:border-purple-400 focus:border-2 focus:outline-none  h-11 md:h-12"
                      autoComplete="off"
                      spellCheck="false"
                      type="password"
                      name="confirmPassword"
                    />
                    <label
                      htmlFor="confirmPassword"
                      className="absolute -mt-2 cursor-pointer right-4 top-5 text-gray-900 text-opacity-30"
                    >
                      <IoEyeOutline size={24} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex pb-2 mt-5 sm:ml-auto lg:pb-0">
            <button
              data-variant="formButton"
              className="group text-sm md:text-sm lg:text-base leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center tracking-[0.2px] rounded placeholder-white focus-visible:outline-none focus:outline-none h-11 md:h-[50px] bg-purple-500 text-white font-manrope px-5 lg:px-6 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-opacity-90 focus:bg-opacity-70 w-full sm:w-auto"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
