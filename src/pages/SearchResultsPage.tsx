import React, { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductModel } from "../models/ProductModel";
import { useLoading } from "../hooks/useLoading";
import axiosApi from "../api/axios-api";
import PageLayout from "../layout/PageLayout";
import LoadingScreen from "./LoadingScreen";
import BreadcrumbComponent from "../components/BreadcrumbComponent";
import Pagination from "../components/Pagination";
import { useProductContext } from "../context/ProductContext";
import { FaFilter } from "react-icons/fa";

const DiscountBanner = lazy(() => import("../components/DiscountBanner"));
const DiscountCoupon = lazy(() => import("../components/DiscountCoupon"));
const NoDataComponent = lazy(() => import("../components/NoDataComponent"));
const ErrorComponent = lazy(() => import("../components/ErrorComponent"));
const FiltersComponent = lazy(() => import("../components/FiltersComponent"));
const ProductGridSm = lazy(() => import("../components/ProductGridSm"));
const FilterDrawerComponent = lazy(
  () => import("../components/FilterDrawerComponent")
);

const SearchResultsPage: React.FC = () => {
  const {
    loadingState: { isLoading },
    loadingDispatch,
  } = useLoading();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<ProductModel[]>([]);
  const [error, setError] = useState<string>("");
  const [limit, setLimit] = useState<number>(9);
  const [skip, setSkip] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const {
    filterDispatch,
    filterState: { byPrice, byRating, byShipping, byStock, reset },
  } = useProductContext();

  useEffect(() => {
    setLimit(9);
    const query = new URLSearchParams(location.search).get("q");
    if (query) {
      fetchSearchResults(query);
    }
  }, [location.search]);

  const fetchSearchResults = async (query: string) => {
    loadingDispatch({ type: "SHOW_LOADING" });
    try {
      await axiosApi
        .get(`https://dummyjson.com/products/search?q=${query}`)
        .then((resp) => {
          setSearchResults(resp.data.products);
        })
        .catch((err) => {
          console.log(err);
          setError(`Error found: ${err}`);
        });
    } catch (error) {
      console.log(error);
      setError("Data loading error..!");
    } finally {
      loadingDispatch({ type: "HIDE_LOADING" });
    }
  };

  useEffect(() => {
    if (reset) {
      filterDispatch({ type: "CLEAR_RESET" });
    }
  }, [reset, filterDispatch]);

  const filteredProducts = () => {
    let sortedProducts = Array.from(searchResults);

    if (byPrice === "high_to_low") {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    } else if (byPrice === "low_to_high") {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    }

    if (byStock.length > 0) {
      let newList: ProductModel[] = [];
      byStock.forEach((item) => {
        const list = sortedProducts.filter(
          (prod) => prod.availabilityStatus === item
        );
        newList = [...newList, ...list];
      });
      sortedProducts = newList;
    }

    if (byShipping.length > 0) {
      let newList: ProductModel[] = [];
      byShipping.forEach((item) => {
        const list = sortedProducts.filter(
          (prod) => prod.shippingInformation === item
        );
        newList = [...newList, ...list];
      });
      sortedProducts = newList;
    }

    if (byRating) {
      sortedProducts = sortedProducts
        .filter((prod) => prod.rating >= byRating)
        .slice(skip, limit);
    }

    if (reset) {
      sortedProducts = Array.from(searchResults);
    }

    return sortedProducts.slice(skip, limit + skip);
  };

  const handlePageChanges = (skipNum: number) => {
    setSkip(skipNum);
  };

  return (
    <PageLayout>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Suspense fallback={<LoadingScreen />}>
            <FilterDrawerComponent
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            >
              <FiltersComponent />
            </FilterDrawerComponent>
          </Suspense>

          <div className="w-full pt-7 pb-14">
            <div className="w-full">
              <div className="container mx-auto">
                {/* Breadcrumb */}
                <BreadcrumbComponent />

                {/* content */}
                {error !== "" ? (
                  <Suspense fallback={<LoadingScreen />}>
                    <ErrorComponent message={error} />
                  </Suspense>
                ) : searchResults.length <= 0 ? (
                  <Suspense fallback={<LoadingScreen />}>
                    <NoDataComponent />
                  </Suspense>
                ) : (
                  <div className="flex gap-3">
                    {/* Filter */}
                    <div className="hidden lg:block w-1/4 pl-2 shadow-sm">
                      <Suspense fallback={<LoadingScreen />}>
                        <FiltersComponent />
                      </Suspense>
                    </div>

                    {/* Products */}
                    <div className="w-full lg:w-3/4 p-3 ">
                      <div className="p-4 px-8 flex justify-between bg-white shadow-sm">
                        <Pagination
                          itemsLength={searchResults.length}
                          limit={limit}
                          skip={skip}
                          handlePage={handlePageChanges}
                        />
                        <FaFilter
                          className="cursor-pointer flex lg:hidden text-gray-500"
                          onClick={() => setIsDrawerOpen(true)}
                        />
                      </div>
                      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
                        {filteredProducts().map((product) => {
                          return (
                            <ProductGridSm key={product.id} product={product} />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <Suspense fallback={<LoadingScreen />}>
        <DiscountBanner>
          <DiscountCoupon discount={21} />
        </DiscountBanner>
      </Suspense>
    </PageLayout>
  );
};

export default SearchResultsPage;
