import { useEffect, useState } from "react";
import BreadcrumbComponent from "../components/BreadcrumbComponent";
import DiscountBanner from "../components/DiscountBanner";
import DiscountCoupon from "../components/DiscountCoupon";
import { useLoading } from "../hooks/useLoading";
import PageLayout from "../layout/PageLayout";
import LoadingScreen from "./LoadingScreen";
import { ProductModel } from "../models/ProductModel";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../api/axios-api";
import ErrorComponent from "../components/ErrorComponent";
import { GoHeart, GoHeartFill } from "react-icons/go";
import RatingComponent from "../components/RatingComponent";
import { getPriceAfterDiscount } from "../utils/helpers";
import { BiSolidOffer } from "react-icons/bi";
import ProductImageSlider from "../components/ProductImageSlider";
import { FaMinus, FaPlus, FaShippingFast } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { PiCertificate } from "react-icons/pi";
import { GrUndo } from "react-icons/gr";
import ReviewComponent from "../components/ReviewComponent";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useProductContext } from "../context/ProductContext";
import ProductGridSm from "../components/ProductGridSm";
import NoDataComponent from "../components/NoDataComponent";
import useAuthContext from "../hooks/useAuthContext";
import { toast } from "react-toastify";

const ProductViewPage = () => {
  const { loadingState, loadingDispatch } = useLoading();
  const { auth } = useAuthContext();
  const {
    productState: { products },
    favoriteState: { favorites },
    favoriteDispatch,
    cartDispatch,
    cartState: { cart },
  } = useProductContext();
  const { id } = useParams();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [reviewIndex, setReviewIndex] = useState<number>(0);
  const [relatedProducts, setRelatedProducts] = useState<ProductModel[]>([]);
  const [revRating, setRevRating] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (products) {
      const tempProd = products.filter(
        (item) => item.category === product?.category
      );
      setRelatedProducts(tempProd.slice(0, 8));
    }
  }, [product, products]);

  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      setError("");
      loadingDispatch({ type: "SHOW_LOADING" });
      try {
        await axiosApi
          .get(`${import.meta.env.VITE_API_URL_PRODUCTS}/${id}`)
          .then((response) => {
            const data: ProductModel = response.data;
            if (isMounted && data) {
              setProduct(data);
              const imgs = [data.thumbnail, ...data.images];
              setImagesList(imgs);
            }
          })
          .catch((error) => {
            console.log(error);
            setError(error?.message);
          });
      } catch (error) {
        console.log(error);
        setError("Error fetching product");
      } finally {
        loadingDispatch({ type: "HIDE_LOADING" });
      }
    };
    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleReviewPrevClick = () => {
    if (product?.reviews) {
      setReviewIndex((prevIndex) =>
        prevIndex === 0 ? product?.reviews.length - 1 : prevIndex - 1
      );
    }
  };

  const handleReviewNextClick = () => {
    if (product?.returnPolicy) {
      setReviewIndex((prevIndex) =>
        prevIndex === product?.reviews.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleAddFav = (item: ProductModel) => {
    const isFav = favorites.some((prod) => prod.id === item.id);
    if (auth?.token) {
      //Handle add to fav list
      if (isFav) {
        favoriteDispatch({ type: "REMOVE_FROM_FAV", payload: item });
        toast.info("Product removed from favorite list..!");
      } else {
        favoriteDispatch({ type: "ADD_TO_FAV", payload: item });
        toast.success("Product added to favorite list..!");
      }

      // navigate("/my-account/favorites", { replace: true });
    } else {
      toast.warning("Please Login to add to favorites");
      navigate("/login", { replace: true });
    }
  };

  const productCart = cart.find((p) => p.id === product?.id);

  return (
    <PageLayout>
      {loadingState.isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="w-full pt-7 pb-14">
            <div className="w-full">
              <div className="container mx-auto">
                {/* Breadcrumb */}
                <BreadcrumbComponent />

                {/* Content */}
                {error !== "" ? (
                  <ErrorComponent message={error} />
                ) : product ? (
                  <div className="w-full flex flex-col gap-y-5">
                    {/* Product Info */}
                    <div className="w-full flex flex-col gap-y-5 md:flex-row md:gap-x-5 p-4 md:p-6">
                      <div className="w-full md:w-1/2 p-1 md:p-4">
                        <ProductImageSlider images={imagesList} />
                      </div>
                      <div className="w-full md:w-1/2 p-4 bg-white rounded-md shadow-md">
                        <div className="flex flex-col gap-y-3">
                          {/* category & stock */}
                          <div className="flex justify-between">
                            <div className="text-base font-medium italic capitalize underline text-gray-700">
                              {product?.category}
                            </div>
                            <div className="px-4 py-1 rounded-full bg-amber-400 text-sm font-semibold text-center">
                              {product?.availabilityStatus}
                            </div>
                          </div>
                          {/* title & Fav */}
                          <div className="flex justify-between content-center">
                            <div className="text-2xl md:text-3xl lg:text-4xl grow font-bold text-gray-700 my-auto">
                              {product?.title}
                            </div>
                            <div
                              className="w-12 h-12 grow-0 rounded-full border-2 border-purple-200 bg-purple-100 flex justify-center items-center cursor-pointer"
                              onClick={() => handleAddFav(product)}
                            >
                              {favorites.some(
                                (item) => item.id === product?.id
                              ) ? (
                                <GoHeartFill className="text-base md:text-lg xl:text-xl text-purple-600" />
                              ) : (
                                <GoHeart className="text-base md:text-lg xl:text-xl text-purple-600" />
                              )}
                            </div>
                          </div>
                          {/* brand */}
                          <div className="text-base font-medium text-gray-700">
                            Brand:{" "}
                            <span className="font-bold">{product?.brand}</span>
                          </div>
                          {/* Rating */}
                          <div className="flex gap-x-3">
                            <RatingComponent
                              rating={Math.round(product?.rating ?? 0)}
                            />{" "}
                            <span className="italic text-gray-400">
                              {product?.rating}
                            </span>
                          </div>
                          {/* Price */}
                          <div className="flex justify-between">
                            <p className="flex gap-3 items-baseline">
                              <span className="text-2xl font-bold text-rose-500">
                                $
                                {getPriceAfterDiscount(
                                  product?.price ?? 0,
                                  product?.discountPercentage ?? 0
                                ).toFixed(2)}
                              </span>
                              <span className="text-lg line-through font-medium text-gray-600">
                                ${product?.price}
                              </span>
                            </p>
                            <div className="ml-6 flex gap-1 items-center py-1 px-3 rounded-md bg-gray-100 border-2 border-gray-300">
                              <span>
                                <BiSolidOffer className="text-[20px] my-auto text-gray-400" />
                              </span>
                              <span className="text-[16px] my-auto text-gray-500 font-semibold">
                                {product?.discountPercentage}%
                              </span>
                            </div>
                          </div>
                          {/* availability */}
                          <p className="text-gray-400 text-sm italic">
                            Stock {product?.stock} items available
                          </p>
                          <hr />
                          {/* add cart button */}
                          <div className="w-full h-14 lg:mb-0 lg:max-w-[400px]">
                            {(productCart?.quantity ?? 0) > 0 ? (
                              <div className="overflow-hidden w-full h-full rounded text-white bg-purple-500 inline-flex justify-between">
                                <button
                                  className="cursor-pointer transition-colors duration-200 hover:bg-purple-600 focus:outline-0 px-5"
                                  onClick={() =>
                                    cartDispatch({
                                      type: "CHANGE_CART_QTY",
                                      payload: {
                                        ...productCart,
                                        quantity:
                                          (productCart?.quantity ?? 0) - 1,
                                      },
                                    })
                                  }
                                >
                                  <FaMinus />
                                </button>
                                <div className="flex flex-1 items-center justify-center px-3 text-base font-semibold">
                                  {productCart ? productCart.quantity : "0"}
                                </div>
                                <button
                                  className="cursor-pointer transition-colors duration-200 hover:bg-purple-600 focus:outline-0 px-5"
                                  title=""
                                  onClick={() =>
                                    cartDispatch({
                                      type: "CHANGE_CART_QTY",
                                      payload: {
                                        ...productCart,
                                        quantity:
                                          (productCart?.quantity ?? 0) + 1,
                                      },
                                    })
                                  }
                                >
                                  <FaPlus />
                                </button>
                              </div>
                            ) : (
                              <button
                                className="flex w-full h-full items-center justify-center rounded bg-purple-600 py-4 px-5 text-base font-semibold text-white transition-colors duration-300 hover:bg-purple-500 focus:bg-purple-500 focus:outline-0 lg:text-base"
                                onClick={() =>
                                  cartDispatch({
                                    type: "ADD_TO_CART",
                                    payload: product,
                                  })
                                }
                              >
                                <span>Add To Cart</span>
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {/* shipping Info */}
                            <div className="flex gap-x-2 mt-2">
                              <FaShippingFast className="text-[20px] text-rose-500" />
                              <span className="text-[16px] text-gray-500">
                                {product?.shippingInformation}
                              </span>
                            </div>
                            {/* tags */}
                            <div className="flex gap-x-2 mt-2">
                              <IoPricetagsOutline className="text-[20px] text-rose-500" />
                              {product?.tags.map((tag) => {
                                return (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
                                  >
                                    {tag}
                                  </span>
                                );
                              })}
                            </div>
                            {/* Warranty */}
                            <div className="flex gap-x-2 mt-2">
                              <PiCertificate className="text-[20px] text-rose-500" />
                              <span className="text-[16px] text-gray-500">
                                {product?.warrantyInformation}
                              </span>
                            </div>
                            {/* Return */}
                            <div className="flex gap-x-2 mt-2">
                              <GrUndo className="text-[20px] text-rose-500" />
                              <span className="text-[16px] text-gray-500">
                                {product?.returnPolicy}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-y-4 md:flex-row md:gap-x-5 p-4 md:p-6">
                      <div className="w-full md:w-1/2 p-4">
                        <div className="flex flex-col gap-y-3 mb-3">
                          <h3 className="text-lg font-bold underline underline-offset-4">
                            Description
                          </h3>
                          <p className="pl-2">{product?.description}</p>
                        </div>
                        <div className="flex flex-col gap-y-3 mb-3">
                          <h3 className="text-lg font-bold underline underline-offset-4">
                            Dimensions
                          </h3>
                          <p className="pl-2 flex gap-x-3">
                            <span>Height:</span>
                            <span className="font-semibold">
                              {product?.dimensions.height}
                            </span>
                          </p>
                          <p className="pl-2 flex gap-x-3">
                            <span>Width:</span>
                            <span className="font-semibold">
                              {product?.dimensions.width}
                            </span>
                          </p>
                          <p className="pl-2 flex gap-x-3">
                            <span>Depth:</span>
                            <span className="font-semibold">
                              {product?.dimensions.depth}
                            </span>
                          </p>
                        </div>
                        <div className="flex flex-col gap-y-3 mb-3">
                          <h3 className="text-lg font-bold underline underline-offset-4">
                            Others
                          </h3>
                          <p className="pl-2 flex gap-x-3">
                            <span>Minimum Order Qty:</span>
                            <span className="font-semibold">
                              {product?.minimumOrderQuantity}
                            </span>
                          </p>
                          <p className="pl-2 flex gap-x-3">
                            <span>Date:</span>
                            <span className="font-semibold">
                              {new Date(
                                product?.meta.createdAt ?? new Date()
                              ).toLocaleString()}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="w-full md:w-1/2 p-4">
                        <div className="flex flex-col gap-y-3 mb-3">
                          <h3 className="text-lg font-bold underline underline-offset-4">
                            Reviews
                          </h3>
                          <div className="mb-3">
                            {product?.reviews && (
                              <ReviewComponent
                                key={reviewIndex}
                                review={product?.reviews[reviewIndex]}
                              />
                            )}
                          </div>
                          <div className="flex justify-center gap-3 pb-3 content-center">
                            <div
                              className="w-6 h-6 flex justify-center items-center rounded-full bg-rose-200 hover:scale-[1.09] active:scale-[0.92] transition-all duration-150"
                              onClick={handleReviewPrevClick}
                            >
                              <IoIosArrowBack className="text-[18px] cursor-pointer text-rose-600 " />
                            </div>
                            <span>
                              {reviewIndex + 1} of {product?.reviews.length}
                            </span>
                            <div
                              className="w-6 h-6 flex justify-center items-center rounded-full bg-rose-200 hover:scale-[1.09] active:scale-[0.92] transition-all duration-150"
                              onClick={handleReviewNextClick}
                            >
                              <IoIosArrowForward className="text-[18px] cursor-pointer text-rose-600 " />
                            </div>
                          </div>
                          {/* Submit Review */}
                          <div className="write-review w-full mb-3">
                            <h1 className="text-lg font-semibold underline underline-offset-4 text-gray-600 mb-3">
                              Write a Review for this product
                            </h1>
                            <div className="w-full review-form ">
                              <div className="w-full mb-[18px]">
                                <h6 className="input-label text-gray-400 capitalize text-[13px] font-normal block ">
                                  Rating*
                                </h6>
                                <RatingComponent
                                  rating={revRating}
                                  onClick={(rev) => setRevRating(rev)}
                                />
                              </div>
                              <div className="w-full mb-[18px]">
                                <h6 className="input-label text-gray-400 capitalize text-[13px] font-normal block ">
                                  Message*
                                </h6>
                                <textarea
                                  name=""
                                  id=""
                                  rows={2}
                                  className="w-full focus:ring-0 focus:outline-none p-6"
                                ></textarea>
                              </div>
                              <div className="flex justify-end">
                                <button
                                  type="button"
                                  className="bg-purple-500 text-white w-[210px] h-[40px] rounded flex justify-center hover:bg-purple-600 transition-all duration-200"
                                >
                                  <span className="flex space-x-1 items-center h-full">
                                    <span className="text-sm font-semibold">
                                      Submit Review
                                    </span>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    {/* Related Products */}
                    <div className="w-full flex flex-col p-6">
                      <div className="text-3xl font-bold">Related Products</div>
                      {/* Products */}
                      <div className="mt-9 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mb-14">
                        {relatedProducts.length > 0 &&
                          relatedProducts.map((product) => {
                            return (
                              <ProductGridSm
                                key={product.id}
                                product={product}
                              />
                            );
                          })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NoDataComponent />
                )}
              </div>
            </div>
          </div>
          <DiscountBanner>
            <DiscountCoupon discount={21} />
          </DiscountBanner>
        </>
      )}
    </PageLayout>
  );
};

export default ProductViewPage;
