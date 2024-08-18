import React from "react";
import { GoHeart } from "react-icons/go";
import { IoMdCart } from "react-icons/io";
import useAuthContext from "../hooks/useAuthContext";

const AccountDashboard: React.FC = () => {
  const {
    userState: { user },
  } = useAuthContext();
  return (
    <div className="w-full p-4 mt-4 overflow-x-auto border rounded-md lg:mt-0 border-gray-200 sm:p-5 lg:py-8 2xl:py-10 lg:px-7 2xl:px-12 bg-white">
      <div className="flex flex-col w-full">
        <div className="quick-view-grid w-full flex justify-between items-center mt-3 gap-x-4">
          <div className="qv-item w-full h-auto flex rounded-md shadow-md bg-gray-500 group hover:bg-purple-500 transition-all duration-300 ease-in-out p-6">
            <div className="w-20 h-20 rounded bg-white flex justify-center items-center">
              <span>
                <GoHeart size={40} className="text-rose-500" />
              </span>
            </div>
            <div className="flex-grow text-center">
              <span className="text-xl text-white mt-5">Favorites</span>
              <span className="text-[40px] text-white font-bold leading-none mt-1 block">
                656
              </span>
            </div>
          </div>
          <div className="qv-item w-full h-auto flex rounded-md shadow-md bg-gray-500 group hover:bg-purple-500 transition-all duration-300 ease-in-out p-6">
            <div className="w-20 h-20 rounded bg-white flex justify-center items-center">
              <span>
                <IoMdCart size={40} className="text-rose-500" />
              </span>
            </div>
            <div className="flex-grow text-center">
              <span className="text-xl text-white mt-5">Orders</span>
              <span className="text-[40px] text-white font-bold leading-none mt-1 block">
                656
              </span>
            </div>
          </div>
        </div>
        <div className="dashboard-info mt-8 flex justify-between items-center px-7 py-2">
          <div className="">
            <p className="title text-[22px] font-semibold">
              Personal Information
            </p>
            <div className="mt-5 mr-4">
              <table>
                <tbody>
                  <tr className="flex mb-5">
                    <td className="text-base text-gray-400 w-[100px] block">
                      <div>Name:</div>
                    </td>
                    <td className="text-base text-gray-800 font-medium">
                      {user.firstName} {user.lastName}
                    </td>
                  </tr>
                  <tr className="flex mb-5">
                    <td className="text-base text-gray-400 w-[100px] block">
                      <div>Email:</div>
                    </td>
                    <td className="text-base text-gray-800 font-medium">
                      {user.email}
                    </td>
                  </tr>
                  <tr className="flex mb-5">
                    <td className="text-base text-gray-400 w-[100px] block">
                      <div>Phone:</div>
                    </td>
                    <td className="text-base text-gray-800 font-medium">
                      {user.phone}
                    </td>
                  </tr>
                  <tr className="flex mb-5">
                    <td className="text-base text-gray-400 w-[100px] block">
                      <div>Gender:</div>
                    </td>
                    <td className="text-base text-gray-800 font-medium">
                      {user.gender}
                    </td>
                  </tr>
                  <tr className="flex mb-5">
                    <td className="text-base text-gray-400 w-[100px] block">
                      <div>DOB:</div>
                    </td>
                    <td className="text-base text-gray-800 font-medium">
                      {user.birthDate}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-[1px] h-[164px] bg-[#E4E4E4]"></div>
          <div className="ml-6">
            <p className="title text-[22px] font-semibold">Delivery Info</p>
            <div className="mt-5">
              <table>
                <tbody>
                  <tr className="flex mb-5">
                    <td className="text-base text-gray-400 w-[100px] block">
                      <div>Address:</div>
                    </td>
                    <td className="text-base text-gray-800 font-medium">
                      {user.address.address}
                    </td>
                  </tr>
                  <tr className="flex mb-5">
                    <td className="text-base text-gray-400 w-[100px] block">
                      <div>City:</div>
                    </td>
                    <td className="text-base text-gray-800 font-medium">
                      {user.address.city} {user.address.state}
                    </td>
                  </tr>
                  <tr className="flex mb-5">
                    <td className="text-base text-gray-400 w-[100px] block">
                      <div>ZIP Code:</div>
                    </td>
                    <td className="text-base text-gray-800 font-medium">
                      {user.address.stateCode} {user.address.postalCode}
                    </td>
                  </tr>
                  <tr className="flex mb-5">
                    <td className="text-base text-gray-400 w-[100px] block">
                      <div>Country:</div>
                    </td>
                    <td className="text-base text-gray-800 font-medium">
                      {user.address.country}
                    </td>
                  </tr>
                  <tr className="flex mb-5">
                    <td className="text-base text-gray-400 w-[100px] block">
                      <div>Location:</div>
                    </td>
                    <td className="text-base text-gray-800 font-medium">
                      {user.address.coordinates.lat},{" "}
                      {user.address.coordinates.lng}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;
