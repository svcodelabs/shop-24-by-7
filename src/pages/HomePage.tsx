import { useEffect, useState } from "react";
import { ProductModel } from "../models/ProductModel";
import LoadingScreen from "./LoadingScreen";
import { useLoading } from "../hooks/useLoading";
import { useProductContext } from "../context/ProductContext";
import HorAutoScrollView from "../components/HorAutoScrollView";
import PageLayout from "../layout/PageLayout";
import ProductGridSm from "../components/ProductGridSm";
import HomeHeadSlider from "../components/HomeHeadSlidr";
import { HomeHeaderSliderData } from "../utils/constants";
import AOS from "aos";
import "aos/dist/aos.css";
import SelectionSlider from "../components/SelectionSlider";
import DiscountBanner from "../components/DiscountBanner";
import FeatureItems from "../components/FeatureItems";
import { CategoryColorModel } from "../models/CategoryModel";
import { useLocation, useNavigate } from "react-router-dom";
import NoDataComponent from "../components/NoDataComponent";

const HomePage = () => {
  const { loadingState, loadingDispatch } = useLoading();
  const [productsList, setProductsList] = useState<ProductModel[]>([]);
  const selectionItems = ["Top Offers", "New Arrivals", "Top Rating"];
  const {
    categoryState: { categories },
    productState: { products },
  } = useProductContext();
  const [selection, setSelection] = useState<string>("New Arrivals");
  const [discountLimit, setDiscountLimit] = useState<number>(0);
  const [ratingLimit, setRatingLimit] = useState<number>(0);
  const [selectionProdList, setSelectionProdList] = useState<ProductModel[]>(
    []
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadingDispatch({ type: "SHOW_LOADING" });
    AOS.init();
    setProductsList(products.slice(1, 30));
    const newProducts = newArrivalProducts(productsList);
    setSelectionProdList(newProducts.slice(1, 12));
    loadingDispatch({ type: "HIDE_LOADING" });
  }, [products, location]);

  useEffect(() => {
    const discounts = productsList.map((item) => item.discountPercentage);
    const maxDisc = Math.max(...discounts);
    const minDisc = Math.min(...discounts);
    const avgDisc = Math.round((maxDisc + minDisc) / 2);
    setDiscountLimit(avgDisc);

    const ratings = productsList.map((item) => item.rating);
    const maxRat = Math.max(...ratings);
    const minRat = Math.min(...ratings);
    const avgRat = Math.round((maxRat + minRat) / 2);
    setRatingLimit(avgRat);
  }, [productsList, selection, products]);

  const handleSelection = (key: string) => {
    setSelection(key);
    if (key === "New Arrivals") {
      const newProducts = newArrivalProducts(productsList);
      setSelectionProdList(newProducts.slice(1, 12));
    } else if (key === "Top Offers") {
      const offerProd = productsList.filter(
        (prod) => prod.discountPercentage >= discountLimit
      );
      if (offerProd.length > 12) {
        setSelectionProdList(offerProd.slice(0, 12));
      } else {
        setSelectionProdList(offerProd);
      }
    } else if (key === "Top Rating") {
      const topRatedProd = productsList.filter(
        (prod) => prod.rating >= ratingLimit
      );
      if (topRatedProd.length > 12) {
        setSelectionProdList(topRatedProd.slice(0, 12));
      } else {
        setSelectionProdList(topRatedProd);
      }
    }
  };

  const newArrivalProducts = (list: ProductModel[]) => {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  };

  const handleCategorySelect = (item: CategoryColorModel) => {
    delete item.icon;
    navigate(`/categories/${item.slug}`, { state: { data: item } });
  };

  return (
    <PageLayout>
      <div>
        {loadingState?.isLoading ? (
          <LoadingScreen />
        ) : (
          <div>
            {/* Hero Header */}
            <HomeHeadSlider
              slides={HomeHeaderSliderData}
              autoSlide={true}
              autoSlideInterval={3000}
            />
            {/* Categories */}
            <HorAutoScrollView
              categoryList={categories}
              onCategorySelect={handleCategorySelect}
            />

            {/* Top / New / Sale Products Selector */}
            <SelectionSlider
              selectionItems={selectionItems}
              onSelectItem={(key) => handleSelection(key)}
            />
            {/* Products */}
            {selectionProdList.length > 0 ? (
              <div className="mx-8 md:mx-16 lg:mx-24 mt-5 md:mt-9 grid grid-cols-1 gap-x-3 md:gap-x-6 gap-y-5 md:gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mb-14">
                {selectionProdList.map((product) => {
                  return <ProductGridSm key={product.id} product={product} />;
                })}
              </div>
            ) : (
              <NoDataComponent />
            )}
            {/* Discount Banner */}
            <DiscountBanner>
              <FeatureItems iconColor="text-rose-500" />
            </DiscountBanner>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default HomePage;
