import React from "react";
import { IoCartOutline } from "react-icons/io5";

const AccountOrders: React.FC = () => {
  return (
    <div className="w-full p-4 mt-4 overflow-x-auto border rounded-md lg:mt-0 border-gray-200 sm:p-5 lg:py-8 2xl:py-10 lg:px-7 2xl:px-12 bg-white">
      <div className="flex flex-col w-full">
        <div className="welcome-msg w-full items-center mb-3">
          <div>
            <h1 className="font-bold text-2xl text-gray-800 mb-2">
              Your Orders
            </h1>
            <hr />
          </div>
        </div>
        <div className="w-full min-h-div flex flex-col justify-center items-center p-12 mx-auto my-10">
          <div className="p-4">
            <IoCartOutline className="text-8xl text-amber-300 opacity-45" />
          </div>
          <div className="text-xl font-bold text-gray-400">
            No Orders Found..!
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOrders;
