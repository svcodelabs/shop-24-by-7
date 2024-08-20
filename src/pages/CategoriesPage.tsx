import { useProductContext } from "../context/ProductContext";
import { useLoading } from "../hooks/useLoading";
import PageLayout from "../layout/PageLayout";
import { CategoryColorModel } from "../models/CategoryModel";
import LoadingScreen from "./LoadingScreen";

import {
  Colors200List,
  Colors300List,
  Colors400List,
  Colors600List,
} from "../utils/constants";
import { ReactElement, useEffect, useState } from "react";
import CategoryItem from "../components/CategoryItem";
import { BsCart2 } from "react-icons/bs";
import { LuBadgePercent } from "react-icons/lu";
import { HiMiniPaperClip } from "react-icons/hi2";
import { FaPercent } from "react-icons/fa";
import {
  IoBagOutline,
  IoBookmarksOutline,
  IoBuildOutline,
  IoBulbOutline,
  IoDiamondOutline,
  IoExtensionPuzzleOutline,
  IoFlagOutline,
  IoGolfOutline,
  IoLayersOutline,
  IoPaperPlaneOutline,
  IoRadioOutline,
  IoSettingsOutline,
  IoShirtOutline,
  IoStarOutline,
} from "react-icons/io5";
import DiscountBanner from "../components/DiscountBanner";
import DiscountCoupon from "../components/DiscountCoupon";
import AOS from "aos";
import "aos/dist/aos.css";
import BreadcrumbComponent from "../components/BreadcrumbComponent";
import { useNavigate } from "react-router-dom";
import NoDataComponent from "../components/NoDataComponent";

const CategoriesPage = () => {
  const {
    categoryState: { categories },
  } = useProductContext();
  const { loadingState, loadingDispatch } = useLoading();
  const [newCategoryList, setNewCategoryList] = useState<CategoryColorModel[]>(
    []
  );
  const navigate = useNavigate();

  const iconsArray: ReactElement[] = [
    <BsCart2 />,
    <LuBadgePercent />,
    <HiMiniPaperClip />,
    <FaPercent />,
    <IoBagOutline />,
    <IoBuildOutline />,
    <IoDiamondOutline />,
    <IoExtensionPuzzleOutline />,
    <IoFlagOutline />,
    <IoGolfOutline />,
    <IoBulbOutline />,
    <IoBookmarksOutline />,
    <IoLayersOutline />,
    <IoPaperPlaneOutline />,
    <IoRadioOutline />,
    <IoShirtOutline />,
    <IoStarOutline />,
    <IoSettingsOutline />,
  ];

  useEffect(() => {
    AOS.init();
    loadingDispatch({ type: "SHOW_LOADING" });
    const newList: CategoryColorModel[] = categories.map((item, i) => {
      const newItem: CategoryColorModel = {
        ...item,
        bgColor: Colors200List[i % Colors200List.length],
        bgToColor: Colors300List[i % Colors300List.length],
        borderColor: Colors400List[i % Colors400List.length],
        icon: iconsArray[i % iconsArray.length],
        iconColor: Colors600List[i % Colors600List.length],
      };
      return newItem;
    });
    setNewCategoryList(newList);
    loadingDispatch({ type: "HIDE_LOADING" });
  }, [categories]);

  const handleCategorySelect = (item: CategoryColorModel) => {
    console.log(item);
    delete item.icon;
    navigate(`/categories/${item.slug}`, { state: { data: item } });
  };

  return (
    <PageLayout>
      {loadingState?.isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="mx-auto max-w-[120rem] px-4 md:px-6 lg:px-8">
          <div className="container pt-4 md:pt-5 lg:pt-6 xl:pt-7 pb-6 md:pb-10 lg:pb-14 xl:pb-16 2xl:pb-20 xl:max-w-screen-xl 2xl:max-w-[1300px] mx-auto">
            <BreadcrumbComponent />
            {newCategoryList?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-4 py-6 mb-[60px]">
                {newCategoryList?.map((cat, index) => {
                  return (
                    <CategoryItem
                      key={index}
                      category={cat}
                      onClickItem={(item) => handleCategorySelect(item)}
                    />
                  );
                })}
              </div>
            ) : (
              <NoDataComponent />
            )}
          </div>
        </div>
      )}
      <DiscountBanner>
        <DiscountCoupon discount={21} />
      </DiscountBanner>
    </PageLayout>
  );
};

export default CategoriesPage;
