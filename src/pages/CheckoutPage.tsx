import React, { useEffect, useState, lazy, Suspense } from "react";
import { useLoading } from "../hooks/useLoading";
import PageLayout from "../layout/PageLayout";
import LoadingScreen from "./LoadingScreen";
import DiscountBanner from "../components/DiscountBanner";
import DiscountCoupon from "../components/DiscountCoupon";
import StepperComponent from "../components/StepperComponent";
import { useProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { CartProductModel } from "../models/CartModel";
import CartItemFull from "../components/CartItemFull";
import useAuthContext from "../hooks/useAuthContext";
import { Radio, RadioGroup } from "@headlessui/react";
import { Address } from "../models/UserModel";
import { FaCircleCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const CheckoutPayment = lazy(() => import("../components/CheckoutPayment"));
const OrderView = lazy(() => import("../components/OrderView"));

const CheckoutPage: React.FC = () => {
  const {
    loadingState: { isLoading },
  } = useLoading();
  const {
    userState: { user },
  } = useAuthContext();
  const {
    cartState: { cart },
  } = useProductContext();
  const navigate = useNavigate();
  const [sumAmount, setSumAmount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selected, setSelected] = useState<Address>(addresses[0]);
  const [payMode, setPayMode] = useState<string>("");

  const handleViewItem = (item: CartProductModel) => {
    navigate(`/products/${item.id}`);
  };

  useEffect(() => {
    setShipping(0);
    setSumAmount(cart.reduce((acc, cur) => acc + cur.total, 0));
    setDiscount(cart.reduce((acc, cur) => acc + cur.discountedTotal, 0));
  }, [cart]);

  useEffect(() => {
    const adr = [user.address];
    setAddresses(adr);
    setSelected(addresses[0]);
  }, [user]);

  const CHECKOUT_STEPS = [
    {
      name: "Cart Info",
      nxtBtnTitle: "Continue",
      isNxtActive: cart.length > 0,
      hasNext: true,
      isPrevActive: false,
      hasPrev: true,
      prevBtnTitle: "Back",
      Component: () => (
        <div>
          {cart.length > 0 ? (
            cart.map((item, i) => {
              return (
                <CartItemFull
                  key={i}
                  cartItem={item}
                  onClickView={() => handleViewItem(item)}
                />
              );
            })
          ) : (
            <div className="flex flex-col justify-center self-center items-center my-12">
              <IoCartOutline className="text-[8rem] text-purple-200" />
              <p className="p-5 text-xl font-bold text-gray-300">
                Your cart is empty.
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      name: "Shipping Info",
      nxtBtnTitle: "Payments",
      isNxtActive: cart.length > 0,
      hasNext: true,
      isPrevActive: true,
      hasPrev: true,
      prevBtnTitle: "Back",
      Component: () => (
        <div className="bg-white p-4 py-8 rounded-md shadow-md">
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
                      emily@dummyjson.com
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
                </tbody>
              </table>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-2 pb-4">
            <p className="title text-[22px] font-semibold">Delivery Address</p>
          </div>
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
                    <div>
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
                    <FaCircleCheck className="size-8 fill-purple-500 opacity-0 transition group-data-[checked]:opacity-100" />
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
        </div>
      ),
    },
    {
      name: "Payment",
      nxtBtnTitle: "Place Order",
      isNxtActive: cart.length > 0,
      hasNext: true,
      isPrevActive: true,
      hasPrev: true,
      prevBtnTitle: "Back",
      Component: () => (
        <Suspense fallback={<LoadingScreen />}>
          <CheckoutPayment onSelectPayment={setPayMode} />
        </Suspense>
      ),
    },
    {
      name: "Order Status",
      nxtBtnTitle: "",
      isNxtActive: false,
      hasNext: false,
      isPrevActive: false,
      hasPrev: false,
      prevBtnTitle: "",
      Component: () => (
        <Suspense fallback={<LoadingScreen />}>
          <OrderView totalAmount={discount} paymentMode={payMode} />
        </Suspense>
      ),
    },
  ];

  return (
    <PageLayout>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mx-auto max-w-[1920px] px-3 md:px-6 lg:px-8 2xl:px-10">
          <div className="pt-4 md:pt-5 lg:pt-6 xl:pt-7 pb-6 md:pb-10 lg:pb-14 xl:pb-16 2xl:pb-20 xl:max-w-screen-xl 2xl:max-w-[1300px] mx-auto">
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <div className="w-full md:w-4/6 p-2 md:p-4">
                <StepperComponent stepsList={CHECKOUT_STEPS} />
              </div>
              <div className="w-full md:w-2/6 px-2 py-4">
                <div className="bg-white shadow-md rounded-md p-4">
                  <div className="flex justify-between items-center w-full py-1 lg:py-2 ">
                    <span className="font-medium text-base text-gray-800">
                      Subtotal
                    </span>
                    <span className="font-semibold text-base text-gray-800">
                      ${sumAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full py-1 lg:py-2 ">
                    <span className="font-medium text-base text-gray-800">
                      Discount
                    </span>
                    <span className="font-semibold text-base text-gray-800">
                      - ${(sumAmount - discount).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full py-1 lg:py-2 ">
                    <span className="font-medium text-base text-gray-800">
                      Shipping
                    </span>
                    <span className="font-semibold text-base text-gray-800">
                      + ${shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full py-1 lg:py-2 border-b border-t border-gray-200 my-2">
                    <span className="font-medium text-xl text-gray-800">
                      Total
                    </span>
                    <span className="font-semibold text-2xl text-gray-800">
                      ${(discount + shipping).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <DiscountBanner>
        <DiscountCoupon discount={21} />
      </DiscountBanner>
    </PageLayout>
  );
};

export default CheckoutPage;
