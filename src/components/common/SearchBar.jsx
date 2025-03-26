import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../config/axios.config";

const SearchBar = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await axiosInstance.get(
        `/product?search=${encodeURIComponent(searchQuery)}`
      );

      if (response?.data?.success) {
        // Create new URLSearchParams with existing parameters
        const params = new URLSearchParams(searchParams);
        // Add or update the search query
        params.set("search", searchQuery);
        // Reset page to 1 when searching
        params.set("page", "1");
        
        // Update URL and trigger re-render
        setSearchParams(params);
        // Force a page reload to trigger re-render
        window.location.href = `?${params.toString()}`;
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSearch}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder={t("searchPlaceHolder")}
          required
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchBar;
