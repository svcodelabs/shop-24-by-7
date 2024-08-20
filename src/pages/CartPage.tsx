import React, { lazy, Suspense, useEffect, useState } from "react";
import { useLoading } from "../hooks/useLoading";
import PageLayout from "../layout/PageLayout";
import LoadingScreen from "./LoadingScreen";
import BreadcrumbComponent from "../components/BreadcrumbComponent";
import { useProductContext } from "../context/ProductContext";
import { FaCartShopping } from "react-icons/fa6";
import { CartProductModel } from "../models/CartModel";
import { useNavigate } from "react-router-dom";

const DiscountBanner = lazy(() => import("../components/DiscountBanner"));
const DiscountCoupon = lazy(() => import("../components/DiscountCoupon"));
const CartItemFull = lazy(() => import("../components/CartItemFull"));

const CartPage: React.FC = () => {
  const {
    loadingState: { isLoading },
  } = useLoading();
  const {
    cartState: { cart },
  } = useProductContext();
  const navigate = useNavigate();
  const [sumAmount, setSumAmount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);

  const handleViewItem = (item: CartProductModel) => {
    navigate(`/products/${item.id}`);
  };

  useEffect(() => {
    setShipping(0);
    setSumAmount(cart.reduce((acc, cur) => acc + cur.total, 0));
    setDiscount(cart.reduce((acc, cur) => acc + cur.discountedTotal, 0));
  }, [cart]);

  return (
    <PageLayout>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mx-auto max-w-[1920px] px-3 md:px-6 lg:px-8 2xl:px-10">
          <div className="pt-4 md:pt-5 lg:pt-6 xl:pt-7 pb-6 md:pb-10 lg:pb-14 xl:pb-16 2xl:pb-20 xl:max-w-screen-xl 2xl:max-w-[1300px] mx-auto">
            <BreadcrumbComponent />
            {cart.length > 0 ? (
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <div className="w-full md:w-4/6 p-4">
                  {cart.map((item, i) => {
                    return (
                      <Suspense fallback={<LoadingScreen />}>
                        <CartItemFull
                          key={i}
                          cartItem={item}
                          onClickView={() => handleViewItem(item)}
                        />
                      </Suspense>
                    );
                  })}
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
                        $
                        {(
                          sumAmount +
                          shipping -
                          (sumAmount - discount)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="py-4 flex flex-col gap-4">
                      <div
                        className="p-3 bg-gray-200 text-gray-900 text-lg font-semibold rounded-md text-center hover:bg-opacity-60 transition-all duration-300 ease-in-out cursor-pointer"
                        role="button"
                        onClick={() => navigate("/products")}
                      >
                        Continue Shopping
                      </div>
                      <div
                        className="p-3 bg-purple-600 text-white text-lg font-semibold rounded-md text-center hover:bg-opacity-80 transition-all duration-300 ease-in-out cursor-pointer"
                        role="button"
                        onClick={() => {
                          navigate("/checkout");
                        }}
                      >
                        Checkout
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full min-h-div flex flex-col justify-center items-center p-12 mx-auto my-10">
                <div className="p-4">
                  <FaCartShopping className="text-8xl text-amber-300 opacity-45" />
                </div>
                <div className="text-xl font-bold text-gray-400">
                  No Items Found in Cart..!
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Suspense fallback={<LoadingScreen />}>
        <DiscountBanner>
          <DiscountCoupon discount={21} />
        </DiscountBanner>
      </Suspense>
    </PageLayout>
  );
};

export default CartPage;
