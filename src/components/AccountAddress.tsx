import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { FaCircleCheck } from "react-icons/fa6";
import useAuthContext from "../hooks/useAuthContext";
import { Address } from "../models/UserModel";
import { FaPlus } from "react-icons/fa";

const AccountAddress: React.FC = () => {
  const {
    userState: { user },
  } = useAuthContext();

  const [addresses, setAddresses] = useState<Address[]>([user.address]);
  const [selected, setSelected] = useState<Address>(addresses[0]);

  useEffect(() => {
    const adr = [user.address];
    setAddresses(adr);
    setSelected(addresses[0]);
  }, [user]);

  return (
    <div className="w-full p-4 mt-4 overflow-x-auto border rounded-md lg:mt-0 border-gray-200 sm:p-5 lg:py-8 2xl:py-10 lg:px-7 2xl:px-12 bg-white">
      <div className="flex flex-col w-full">
        <div className="welcome-msg w-full items-center mb-5">
          <div>
            <h1 className="font-bold text-2xl text-gray-800 mb-2">
              Your Address List
            </h1>
            <hr />
          </div>
        </div>

        <div className="flex flex-col justify-between h-full text-15px md:mt-0">
          <RadioGroup
            value={selected}
            onChange={setSelected}
            aria-label="Addresses"
            className="space-y-4 md:grid md:grid-cols-2 md:gap-5 auto-rows-auto md:space-y-0"
          >
            {addresses.map((adr, i) => {
              return (
                <Radio
                  key={i}
                  value={adr}
                  className="group relative flex cursor-pointer border rounded-lg bg-white/5 py-4 px-5 text-gray-800 shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-purple-200/10"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="pr-2 md:pr-4">
                      <p className="mb-2 -mt-1 font-semibold text-gray-800">
                        Home
                      </p>
                      <div className="leading-6 text-gray-500">
                        <div className="text-base">
                          {adr.address}, {adr.city}, {adr.state},{" "}
                          {adr.stateCode} - {adr.postalCode}, {adr.country}
                        </div>
                      </div>
                    </div>
                    <FaCircleCheck className="size-12 fill-purple-500 opacity-0 transition group-data-[checked]:opacity-100" />
                  </div>
                </Radio>
              );
            })}
            <button
              className="w-full group border justify-center transition-all border-gray-200 cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-gray-700 shadow-md flex hover:border-purple-500 items-center min-h-[112px] h-full"
              role="none"
            >
              <FaPlus className="text-xl mr-2 group-hover:text-purple-500" />
              <span className="text-lg font-semibold group-hover:text-purple-500">
                Add Address
              </span>
            </button>
          </RadioGroup>

          <div className="flex mt-5 sm:justify-end md:mt-10 lg:mt-20 save-change-button">
            <button
              className="group text-sm md:text-sm lg:text-base leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center tracking-[0.2px] rounded placeholder-white focus-visible:outline-none focus:outline-none h-11 md:h-[50px] bg-purple-500 text-white font-manrope px-5 lg:px-6 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-opacity-90 focus:bg-opacity-70 w-full sm:w-auto"
              type="button"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAddress;
