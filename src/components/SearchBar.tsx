import React from "react";
import { IoArrowForward, IoClose, IoSearch } from "react-icons/io5";
import useSearch from "../hooks/useSearch";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  closeSearch?: (value: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

const SearchBar: React.FC<SearchBarProps> = ({
  closeSearch,
  className,
  style,
}) => {
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();

  const handleOnSearch = () => {
    navigate(`/searchResults?q=${searchTerm}`);
  };

  const handleCloseSearch = (value: boolean) => {
    if (closeSearch) {
      closeSearch(value);
    }
  };

  return (
    <div className={`grow ${className}`} style={style}>
      <div className="flex-grow max-w-auto relative mx-2 md:mx-4 lg:mx-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-1 lg:p-2 pl-8 lg:pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-400"
          placeholder="Search..."
        />
        <span className="absolute inset-y-0 left-1 flex items-center pb-3 text-gray-400 rotate-90 cursor-pointer">
          <IoSearch className="text-xl lg:text-2xl" />
        </span>
        <span className="absolute inset-y-0 right-1 flex items-center px-1 text-gray-300 cursor-pointer">
          <IoArrowForward
            className={`cursor-pointer text-xl lg:text-2xl ${
              searchTerm === ""
                ? "hidden pointer-events-none cursor-not-allowed"
                : "lex"
            }`}
            onClick={handleOnSearch}
            style={{
              color: `${searchTerm !== "" ? "#f43f5e" : ""}`,
            }}
          />
          <IoClose
            className={`lg:hidden cursor-pointer text-xl lg:text-2xl ${
              searchTerm === ""
                ? "flex"
                : "hidden pointer-events-none cursor-not-allowed"
            }`}
            onClick={() => handleCloseSearch(true)}
          />
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
