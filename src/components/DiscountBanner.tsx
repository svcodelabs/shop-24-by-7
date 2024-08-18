import React from "react";

interface DiscountProps {
  children: React.ReactNode;
}

const DiscountBanner: React.FC<DiscountProps> = ({ children }) => {
  return (
    <div
      className="w-full h-[307px] bg-cover flex justify-center items-center "
      style={{
        background: `url('/assets/images/discount-banner-1.jpg') 0% 0% / cover no-repeat`,
      }}
    >
      {children}
    </div>
  );
};

export default DiscountBanner;
