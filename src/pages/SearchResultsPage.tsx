import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductModel } from "../models/ProductModel";
import { useLoading } from "../hooks/useLoading";
import axiosApi from "../api/axios-api";
import PageLayout from "../layout/PageLayout";
import LoadingScreen from "./LoadingScreen";
import BreadcrumbComponent from "../components/BreadcrumbComponent";
import ErrorComponent from "../components/ErrorComponent";
import NoDataComponent from "../components/NoDataComponent";
import Pagination from "../components/Pagination";
import ProductGridSm from "../components/ProductGridSm";
import { useProductContext } from "../context/ProductContext";
import FiltersComponent from "../components/FiltersComponent";
import DiscountBanner from "../components/DiscountBanner";
import DiscountCoupon from "../components/DiscountCoupon";

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
        .get(`${import.meta.env.VITE_API_URL_PRODUCTS}/search?q=${query}`)
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
          <div className="w-full pt-7 pb-14">
            <div className="w-full">
              <div className="container mx-auto">
                {/* Breadcrumb */}
                <BreadcrumbComponent />

                {/* content */}
                {error !== "" ? (
                  <ErrorComponent message={error} />
                ) : searchResults.length <= 0 ? (
                  <NoDataComponent />
                ) : (
                  <div className="flex gap-3">
                    {/* Filter */}
                    <div className="hidden lg:block w-1/4 pl-2 shadow-sm">
                      <FiltersComponent />
                    </div>

                    {/* Products */}
                    <div className="w-full lg:w-3/4 p-3 ">
                      <div className="p-4 pl-8 flex justify-start bg-white shadow-sm">
                        <Pagination
                          itemsLength={searchResults.length}
                          limit={limit}
                          skip={skip}
                          handlePage={handlePageChanges}
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
          <DiscountBanner>
            <DiscountCoupon discount={21} />
          </DiscountBanner>
        </>
      )}
    </PageLayout>
  );
};

export default SearchResultsPage;
