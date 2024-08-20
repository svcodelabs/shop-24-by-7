import { useProductContext } from "../context/ProductContext";
import { useLoading } from "../hooks/useLoading";
import PageLayout from "../layout/PageLayout";
import LoadingScreen from "./LoadingScreen";
import { lazy, Suspense, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ProductModel } from "../models/ProductModel";
import BreadcrumbComponent from "../components/BreadcrumbComponent";
import Pagination from "../components/Pagination";
import { FaFilter } from "react-icons/fa";

const DiscountBanner = lazy(() => import("../components/DiscountBanner"));
const DiscountCoupon = lazy(() => import("../components/DiscountCoupon"));
const NoDataComponent = lazy(() => import("../components/NoDataComponent"));
const FiltersComponent = lazy(() => import("../components/FiltersComponent"));
const ProductGridSm = lazy(() => import("../components/ProductGridSm"));
const FilterDrawerComponent = lazy(
  () => import("../components/FilterDrawerComponent")
);

const ProductsPage = () => {
  const {
    productState: { products },
    filterDispatch,
    filterState: { byPrice, byRating, byShipping, byStock, reset },
  } = useProductContext();
  const { loadingState } = useLoading();
  const [limit, setLimit] = useState<number>(12);
  const [skip, setSkip] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    AOS.init();
    setLimit(12);
  }, []);

  useEffect(() => {
    if (reset) {
      filterDispatch({ type: "CLEAR_RESET" });
    }
    return () => {
      filterDispatch({ type: "RESET_FILTERS" });
    };
  }, [filterDispatch]);

  const filteredProducts = () => {
    let sortedProducts = Array.from(products);

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
      sortedProducts = Array.from(products);
    }

    return sortedProducts.slice(skip, limit + skip);
  };

  const handlePageChanges = (skipNum: number) => {
    setSkip(skipNum);
  };

  return (
    <PageLayout>
      {loadingState?.isLoading ? (
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

                {/* Product container */}
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
                        itemsLength={products.length}
                        limit={limit}
                        skip={skip}
                        handlePage={handlePageChanges}
                      />
                      <FaFilter
                        className="cursor-pointer flex lg:hidden text-gray-500"
                        onClick={() => setIsDrawerOpen(true)}
                      />
                    </div>
                    {filteredProducts().length > 0 ? (
                      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
                        {filteredProducts().map((product) => {
                          return (
                            <Suspense fallback={<LoadingScreen />}>
                              <ProductGridSm
                                key={product.id}
                                product={product}
                              />
                            </Suspense>
                          );
                        })}
                      </div>
                    ) : (
                      <Suspense fallback={<LoadingScreen />}>
                        <NoDataComponent />
                      </Suspense>
                    )}
                  </div>
                </div>
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

export default ProductsPage;
