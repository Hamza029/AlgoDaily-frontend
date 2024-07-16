import { createContext, useEffect, useState } from "react";
import AppContextType from "./AppContextType";
import useFilter from "../../hooks/useFilter";
import blogAPI from "../../api/blogAPI";
import { BlogResponse } from "../../shared/types";

export const AppContext = createContext<AppContextType>({
  blogs: [],
  currentPage: 1,
  setCurrentPage: (_prev) => null,
  oldest: true,
  newest: false,
  popular: false,
  handleFilter: (_e) => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<BlogResponse[]>([]);

  const { oldest, newest, popular, handleFilter } = useFilter();

  useEffect(() => {
    // if the dependencies change then fetch blogs again
    blogAPI.getAllBlogs(currentPage).then((res) => {
      setBlogs(() => res.data);
    });
  }, [currentPage, oldest, newest, popular]);

  return (
    <AppContext.Provider
      value={{
        blogs,
        currentPage,
        setCurrentPage,
        oldest,
        newest,
        popular,
        handleFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
