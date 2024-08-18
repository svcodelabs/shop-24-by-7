import { useContext } from "react";
import { SearchContext } from "../context/SearchProvider";

const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export default useSearch;
