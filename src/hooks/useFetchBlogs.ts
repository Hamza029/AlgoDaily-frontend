import { useState, useEffect, useCallback } from "react";
import blogAPI from "../api/blogAPI";
import { AppError } from "../helpers/AppError";
import { BlogResponse } from "../shared/types";
import { FILTER_TYPE } from "../config/constants";

function useFetchBlogs(crrentAuthorId: string = "") {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<BlogResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [filterType, setFilterType] = useState<FILTER_TYPE>(FILTER_TYPE.OLDEST);
  const [authorId, setAuthorId] = useState<string>(crrentAuthorId);

  const fetchBlogs = useCallback(() => {
    blogAPI
      .getAllBlogs(currentPage, searchText, authorId)
      .then((res) => {
        setBlogs(() => res.data);
        setErrorMessage(() => null);
      })
      .catch((err) => {
        setErrorMessage(() => (err as AppError).message);
      });
  }, [currentPage, searchText, authorId]);

  useEffect(() => {
    // if the dependencies change then fetch blogs again
    fetchBlogs();
  }, [currentPage, filterType, searchText, authorId, fetchBlogs]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, filterType]);

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
    setAuthorId,
    fetchBlogs,
  };
}

export default useFetchBlogs;
