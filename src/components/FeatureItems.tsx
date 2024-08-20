import React from "react";
import { BsShieldLock } from "react-icons/bs";
import { IoIosRefresh, IoMdCart } from "react-icons/io";
import { IoTrophyOutline } from "react-icons/io5";

interface FeatureProps {
  bgColor?: string;
  bgOpacity?: string;
  borderRound?: string;
  textColor?: string;
  subTextColor?: string;
  iconColor?: string;
}

const FeatureItems: React.FC<FeatureProps> = ({
  bgColor = "bg-white",
  bgOpacity = "bg-opacity-65",
  borderRound = "rounded-md",
  textColor = "text-black",
  subTextColor = "text-gray-500",
  iconColor = "text-black",
}) => {
  return (
    <div
      className={`container-x mx-auto ${bgColor} ${bgOpacity} ${borderRound}`}
    >
      <div className=" w-full flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-5 md:px-10 lg:py-0 py-4">
        <div className="item px-4">
          <div className="flex space-x-5 items-center">
            <div>
              <span>
                <IoMdCart size={36} className={`${iconColor}`} />
              </span>
            </div>
            <div>
              <p className={`${textColor} text-base font-bold mb-1`}>
                Free Shipping
              </p>
              <p className={`text-sm ${subTextColor}`}>
                When ordering over $100
              </p>
            </div>
          </div>
        </div>
        <div className="item px-4">
          <div className="flex space-x-5 items-center">
            <div>
              <span>
                <IoIosRefresh size={36} className={`${iconColor}`} />
              </span>
            </div>
            <div>
              <p className={`${textColor} text-base font-bold mb-1`}>
                Free Return
              </p>
              <p className={`text-sm ${subTextColor}`}>
                Get Return within 30 days
              </p>
            </div>
          </div>
        </div>
        <div className="item px-4">
          <div className="flex space-x-5 items-center">
            <div>
              <span>
                <BsShieldLock size={36} className={`${iconColor}`} />
              </span>
            </div>
            <div>
              <p className={`${textColor} text-base font-bold mb-1`}>
                Secure Payment
              </p>
              <p className={`text-sm ${subTextColor}`}>
                100% Secure Online Payment
              </p>
            </div>
          </div>
        </div>
        <div className="item px-4">
          <div className="flex space-x-5 items-center">
            <div>
              <span>
                <IoTrophyOutline size={36} className={`${iconColor}`} />
              </span>
            </div>
            <div>
              <p className={`${textColor} text-base font-bold mb-1`}>
                Best Quality
              </p>
              <p className={`text-sm ${subTextColor}`}>
                Original Product Guaranteed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureItems;
