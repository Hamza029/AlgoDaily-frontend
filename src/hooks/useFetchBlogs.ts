import { useState, useEffect } from "react";
import blogAPI from "../api/blogAPI";
import { AppError } from "../helpers/AppError";
import { BlogResponse } from "../shared/types";
import { FILTER_TYPE } from "../config/constants";

function useFetchBlogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<BlogResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [filterType, setFilterType] = useState<FILTER_TYPE>(FILTER_TYPE.OLDEST);

  useEffect(() => {
    // if the dependencies change then fetch blogs again
    blogAPI
      .getAllBlogs(currentPage, searchText)
      .then((res) => {
        setBlogs(() => res.data);
        setErrorMessage(() => null);
      })
      .catch((err) => {
        setErrorMessage(() => (err as AppError).message);
      });
  }, [currentPage, filterType, searchText, setSearchText]);

  return {
    blogs,
    currentPage,
    setCurrentPage,
    filterType,
    setFilterType,
    errorMessage,
    setErrorMessage,
    searchText,
    setSearchText,
  };
}

export default useFetchBlogs;
