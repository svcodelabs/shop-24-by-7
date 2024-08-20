import React, { useState } from "react";
import { IoMailOutline } from "react-icons/io5";

interface DCouponProps {
  discount: number;
}

const DiscountCoupon: React.FC<DCouponProps> = ({ discount = 18 }) => {
  const [emailId, setEmailId] = useState<string>("");

  const onHandleSubscribe = () => {
    if (emailId.trim() === "") return;
    console.log("Subscribed Email: " + emailId);
  };

  return (
    <div>
      <div data-aos="fade-up" className="aos-init aos-animate">
        <h1 className="sm:text-3xl text-xl font-bold text-black mb-2 text-center">
          Get
          <span className="mx-3 text-rose-500">{discount}%</span>
          Off Discount Coupon
        </h1>
        <p className="text-center sm:text-[18px] text-sm font-400">
          by Subscribe our Newsletter
        </p>
      </div>
      <div
        data-aos="fade-right"
        className="sm:w-[543px] w-[300px] h-[54px] flex mt-8 aos-init aos-animate"
      >
        <div className="flex-1 bg-white pl-4 flex space-x-2 items-center h-full rounded-tl-md rounded-bl-md focus-within:text-purple-600 text-black">
          <span>
            <IoMailOutline size={18} />
          </span>
          <input
            type="email"
            name="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="w-full h-full focus:outline-none text-sm placeholder:text-xs placeholder:text-black text-black font-400 tracking-wider"
            placeholder="EMAIL ADDRESS"
          />
        </div>
        <button
          type="button"
          className="sm:w-[158px] w-auto px-2  h-full bg-purple-500 rounded-tr-md rounded-br-md text-base font-medium md:font-semibold text-white"
          onClick={onHandleSubscribe}
        >
          Get Coupon
        </button>
      </div>
    </div>
  );
};

export default DiscountCoupon;
