import React from "react";
import { useProductContext } from "../context/ProductContext";
import RadioGroup from "./RadioGroup";
import CheckboxGroup from "./CheckboxGroup";
import RatingComponent from "./RatingComponent";

interface FilterProps {
  className?: string;
  style?: React.CSSProperties;
  hasPrice?: boolean;
  hasStock?: boolean;
  hasShipping?: boolean;
  hasRating?: boolean;
  hasReset?: boolean;
  hasCategory?: boolean;
}

const radioOptions = [
  { label: "Low to High", value: "low_to_high" },
  { label: "High to Low", value: "high_to_low" },
];

const FiltersComponent: React.FC<FilterProps> = ({
  className = "",
  style,
  hasPrice = true,
  hasStock = true,
  hasShipping = true,
  hasRating = true,
  hasReset = true,
  hasCategory = true,
}) => {
  const {
    categoryState: { shippingStatus, stockStatus },
    filterDispatch,
    filterState: { byPrice, byRating, byShipping, byStock },
  } = useProductContext();

  const stockCheckboxOptions = stockStatus.map((item) => {
    return { label: item, value: item };
  });

  const shippingCheckboxOptions = shippingStatus.map((item) => {
    return { label: item, value: item };
  });

  return (
    <>
      <div
        className={`px-1 md:px-3 bg-white rounded-md ${className}`}
        style={style}
      >
        <div className="flex flex-col gap-y-3">
          {hasCategory && <div className="flex flex-col"></div>}
          {hasPrice && (
            <div className="flex flex-col">
              <span className="font-bold">Prince</span>
              <RadioGroup
                options={radioOptions}
                name="Price"
                value={byPrice}
                onChange={(value) => {
                  filterDispatch({ type: "SORT_BY_PRICE", payload: value });
                }}
                className="pl-2 mb-3 mt-1"
              />
            </div>
          )}
          {hasStock && (
            <div className="flex flex-col">
              <span className="font-bold">Stock Availability</span>
              <CheckboxGroup
                options={stockCheckboxOptions}
                selectedValues={byStock}
                onChange={(value) => {
                  filterDispatch({ type: "FILTER_BY_STOCK", payload: value });
                }}
                className="pl-2 mb-3 mt-1"
              />
            </div>
          )}
          {hasShipping && (
            <div className="flex flex-col">
              <span className="font-bold">Shipping Time</span>
              <CheckboxGroup
                options={shippingCheckboxOptions}
                selectedValues={byShipping}
                onChange={(value) =>
                  filterDispatch({ type: "FILTER_BY_SHIPPING", payload: value })
                }
                className="pl-2 mb-3 mt-1"
              />
            </div>
          )}
          {hasRating && (
            <div className="flex flex-col">
              <span className="font-bold">Rating</span>
              <RatingComponent
                rating={byRating}
                onClick={(i) =>
                  filterDispatch({ type: "FILTER_BY_RATING", payload: i })
                }
                className="pl-2 mt-1 mb-1 md:mb-3"
              />
            </div>
          )}
          {hasReset && (
            <div className="flex flex-col">
              <button
                type="button"
                className="mb-4 md:mb-6 mt-2 md:mt-4 px-6 py-2 bg-rose-500 rounded-md text-white text-base font-semibold active:scale-[.97] active:bg-rose-600 active:duration-300 transition-all hover:scale-[1.03] hover:bg-rose-600  ease-in-out transform"
                onClick={() => filterDispatch({ type: "RESET_FILTERS" })}
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FiltersComponent;
