import { createContext, useEffect, useState } from "react";
import AppContextType from "./AppContextType";
import useFilter from "../../hooks/useFilter";
import blogAPI from "../../api/blogAPI";
import { BlogResponse } from "../../shared/types";
import { FILTER_TYPE } from "../../config/constants";

export const AppContext = createContext<AppContextType>({
  blogs: [],
  currentPage: 1,
  setCurrentPage: (_prev) => null,
  filterType: FILTER_TYPE.OLDEST,
  handleFilter: (_e) => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<BlogResponse[]>([]);

  const { filterType, handleFilter } = useFilter();

  useEffect(() => {
    // if the dependencies change then fetch blogs again
    blogAPI.getAllBlogs(currentPage).then((res) => {
      setBlogs(() => res.data);
    });
  }, [currentPage, filterType]);

  return (
    <AppContext.Provider
      value={{
        blogs,
        currentPage,
        setCurrentPage,
        filterType,
        handleFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
