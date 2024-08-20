import React, { useEffect } from "react";
import { LuCheckCircle } from "react-icons/lu";
import { useProductContext } from "../context/ProductContext";

interface OrderProps {
  totalAmount: number;
  paymentMode: string;
}

const OrderView: React.FC<OrderProps> = ({
  totalAmount = 9.98,
  paymentMode = "Pay on Delivery",
}) => {
  const {
    cartState: { cart },
    cartDispatch,
  } = useProductContext();

  useEffect(() => {
    if (cart.length > 0) {
      cartDispatch({ type: "CLEAR_CART" });
    }
  }, []);

  return (
    <div className="bg-white p-4 py-8 rounded-md shadow-md">
      <div className="pb-4">
        <p className="title text-[22px] font-semibold">Order Details</p>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col gap-y-4 justify-center items-center mb-4">
          <div className="w-40 h-40 bg-green-200 flex justify-center items-center rounded-full">
            <div className="w-32 h-32 bg-green-500 flex justify-center items-center rounded-full">
              <LuCheckCircle className="text-white text-[4rem]" />
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-500">
            Order Placed Successfully..!
          </p>
        </div>
        <table>
          <tbody>
            <tr className="flex mb-5">
              <td className="text-base text-gray-400 w-40 block">
                <div>Order ID:</div>
              </td>
              <td className="text-base text-gray-800 font-medium">
                #ORD_12957
              </td>
            </tr>
            <tr className="flex mb-5">
              <td className="text-base text-gray-400 w-40 block">
                <div>Booking Date:</div>
              </td>
              <td className="text-base text-gray-800 font-medium">
                {new Date().toLocaleDateString()}
              </td>
            </tr>
            <tr className="flex mb-5">
              <td className="text-base text-gray-400 w-40 block">
                <div>Total Amount:</div>
              </td>
              <td className="text-base text-gray-800 font-medium">
                ${totalAmount.toFixed(2)}
              </td>
            </tr>
            <tr className="flex mb-5">
              <td className="text-base text-gray-400 w-40 block">
                <div>Payment Mode:</div>
              </td>
              <td className="text-base text-gray-800 font-medium">
                {paymentMode}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderView;
