import { useState, useEffect, useCallback } from "react";
import blogAPI from "../api/blogAPI";
import { AppError } from "../helpers/AppError";
import { BlogResponse } from "../shared/types";
import { FILTER_TYPE } from "../config/constants";

interface IUseFetchBlogs {
  currentAuthorId?: string | null;
  pageNumber?: number | null;
  blogSearchText?: string | null;
}

function useFetchBlogs({
  currentAuthorId,
  pageNumber,
  blogSearchText,
}: IUseFetchBlogs) {
  const [currentPage, setCurrentPage] = useState(pageNumber || 1);
  const [blogs, setBlogs] = useState<BlogResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>(blogSearchText || "");
  const [filterType, setFilterType] = useState<FILTER_TYPE>(FILTER_TYPE.OLDEST);
  const [authorId, setAuthorId] = useState<string>(currentAuthorId || "");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBlogs = useCallback(() => {
    setLoading((_p) => true);
    blogAPI
      .getAllBlogs(currentPage, searchText, authorId)
      .then((res) => {
        setBlogs(() => res.data.blogs);
        setTotalPages(() => res.data.totalPages);
        setErrorMessage(() => null);
      })
      .catch((err) => {
        setErrorMessage(() => (err as AppError).message);
      })
      .finally(() => {
        setLoading((_p) => false);
      });
  }, [currentPage, searchText, authorId]);

  useEffect(() => {
    // if the dependencies change then fetch blogs again
    setLoading((_p) => true);
    blogAPI
      .getAllBlogs(currentPage, searchText, authorId)
      .then((res) => {
        setBlogs(() => res.data.blogs);
        setTotalPages(() => res.data.totalPages);
      })
      .catch((err) => {
        setErrorMessage(() => (err as AppError).message);
      })
      .finally(() => {
        setLoading((_p) => false);
      });
  }, [currentPage, filterType, searchText, authorId]);

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
    totalPages,
    loading,
  };
}

export default useFetchBlogs;
