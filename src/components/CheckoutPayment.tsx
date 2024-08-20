import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { FaCircleCheck } from "react-icons/fa6";

interface PaymentTypeModel {
  title: string;
  hasComponent: boolean;
}

const paymentTypes: PaymentTypeModel[] = [
  {
    title: "Pay Now",
    hasComponent: true,
  },
  { title: "Pay On Delivery", hasComponent: false },
];

interface ChkPaymentProps {
  onSelectPayment: (mode: string) => void;
}

const CheckoutPayment: React.FC<ChkPaymentProps> = ({ onSelectPayment }) => {
  const [paymentModes, setPaymentModes] =
    useState<PaymentTypeModel[]>(paymentTypes);
  const [curPayInd, setCurPayInd] = useState<PaymentTypeModel>(paymentTypes[0]);
  // const [coupon, setCoupon] = useState<string>("");

  useEffect(() => {
    setPaymentModes(paymentTypes);
  }, []);

  const handlePaymentSelect = (item: PaymentTypeModel) => {
    setCurPayInd(item);
    onSelectPayment(item.title);
  };

  const PaymentForm: React.FC = () => (
    <form
      className="flex flex-col justify-center w-full mx-auto"
      noValidate={false}
    >
      <div className="pb-7 md:pb-9 lg:pb-10">
        <div className="flex flex-col space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
            <div className="w-full sm:w-1/2 px-1.5 md:px-2.5">
              <label
                htmlFor="cardHolderName"
                className="block font-normal text-sm leading-none mb-3 cursor-pointer text-black text-opacity-70"
              >
                Card Holder Name *
              </label>
              <input
                id="cardHolderName"
                placeholder=""
                className="py-2 px-4 w-full appearance-none border text-sm lg:text-base rounded placeholder-[#B3B3B3] min-h-10 transition duration-200 ease-in-out text-black focus:ring-0 focus:border-purple-400 focus:border-2 focus:outline-none  h-10 md:h-10"
                autoComplete="off"
                spellCheck="false"
                aria-invalid="false"
                type="text"
                name="cardHolderName"
              />
            </div>
            <div className="w-full sm:w-1/2 px-1.5 md:px-2.5">
              <label
                htmlFor="cardNo"
                className="block font-normal text-sm leading-none mb-3 cursor-pointer text-black text-opacity-70"
              >
                Card Number *
              </label>
              <input
                id="cardNo"
                placeholder=""
                className="py-2 px-4 w-full appearance-none border text-sm lg:text-base rounded placeholder-[#B3B3B3] min-h-10 transition duration-200 ease-in-out text-black focus:ring-0 focus:border-purple-400 focus:border-2 focus:outline-none  h-10 md:h-10"
                autoComplete="off"
                spellCheck="false"
                aria-invalid="false"
                type="text"
                name="cardNo"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
            <div className="w-full sm:w-1/2 px-1.5 md:px-2.5">
              <label
                htmlFor="expiryDate"
                className="block mb-3 text-sm font-normal leading-none cursor-pointer text-black opacity-70"
              >
                Expiry Date
              </label>
              <input
                id="expiryDate"
                placeholder="MM/YY"
                className="py-2 px-4 w-full appearance-none border text-sm lg:text-base rounded placeholder-[#B3B3B3] min-h-10 transition duration-200 ease-in-out text-black focus:ring-0 focus:border-purple-400 focus:border-2 focus:outline-none  h-10 md:h-10"
                autoComplete="off"
                spellCheck="false"
                type="text"
                name="expiryDate"
              />
            </div>
            <div className="w-full sm:w-1/2 px-1.5 md:px-2.5">
              <label
                htmlFor="cvvCode"
                className="block mb-3 text-sm font-normal leading-none cursor-pointer text-black opacity-70"
              >
                CVV Code
              </label>
              <input
                id="cvvCode"
                placeholder="***"
                className="py-2 px-4 w-full appearance-none border text-sm lg:text-base rounded placeholder-[#B3B3B3] min-h-10 transition duration-200 ease-in-out text-black focus:ring-0 focus:border-purple-400 focus:border-2 focus:outline-none  h-10 md:h-10"
                autoComplete="off"
                spellCheck="false"
                type="password"
                name="cvvCode"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <div className="bg-white p-4 py-8 rounded-md shadow-md">
      <div className="pt-2 pb-4">
        <p className="title text-[22px] font-semibold">Select Payment Method</p>
      </div>
      <RadioGroup
        value={curPayInd}
        onChange={handlePaymentSelect}
        aria-label="Payment Modes"
        className="space-y-4 md:grid md:grid-cols-1 md:gap-5 auto-rows-auto md:space-y-0"
      >
        {paymentModes.map((pay, i) => {
          return (
            <Radio
              key={i}
              value={pay}
              className="group relative flex cursor-pointer border rounded-lg bg-white/5 py-4 px-5 text-gray-800 shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-purple-200/10"
            >
              <div className="flex w-full items-center justify-start align-middle gap-3">
                <FaCircleCheck className="size-8 fill-purple-500 opacity-0 transition group-data-[checked]:opacity-100" />
                <div className="flex flex-col w-full">
                  <div className="leading-6 text-gray-500">
                    <div className="text-lg font-semibold">{pay.title}</div>
                  </div>
                  {pay.hasComponent && curPayInd === pay && (
                    <div className="px-2 py-4">
                      <PaymentForm />
                    </div>
                  )}
                </div>
              </div>
            </Radio>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default CheckoutPayment;
