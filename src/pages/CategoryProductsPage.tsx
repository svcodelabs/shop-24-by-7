import React, { lazy, Suspense, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useLoading } from "../hooks/useLoading";
import { Category, ProductModel } from "../models/ProductModel";
import { useProductContext } from "../context/ProductContext";
import PageLayout from "../layout/PageLayout";
import LoadingScreen from "./LoadingScreen";
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

const CategoryProductsPage: React.FC = () => {
  const { slug } = useParams();
  const location = useLocation();
  const {
    productState: { products },
    filterState: { byPrice, byRating, byShipping, byStock, reset },
    filterDispatch,
  } = useProductContext();
  const {
    loadingState: { isLoading },
  } = useLoading();
  const [categoryProducts, setCategoryProducts] = useState<ProductModel[]>([]);
  const [limit, setLimit] = useState<number>(12);
  const [skip, setSkip] = useState<number>(0);
  const [cData, setCData] = useState<Category | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (location.state.data) {
      setCData(location.state.data);
    }
    if (reset) {
      filterDispatch({ type: "CLEAR_RESET" });
    }
    setLimit(12);
    if (products) {
      const tempProd = products.filter((item) => item.category === slug);
      setCategoryProducts(tempProd);
    }
    return () => {
      filterDispatch({ type: "RESET_FILTERS" });
    };
  }, [slug, products, location.state.data]);

  const filteredProducts = () => {
    let sortedProducts = Array.from(categoryProducts);

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
      sortedProducts = Array.from(categoryProducts);
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

          <div className="w-full pt-3 pb-6 md:pt-5 md:pb-10 lg:pt-7 lg:pb-14">
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
                      <div className="text-lg font-bold text-rose-500">
                        {cData?.name}
                      </div>
                      <Pagination
                        itemsLength={categoryProducts.length}
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

export default CategoryProductsPage;
