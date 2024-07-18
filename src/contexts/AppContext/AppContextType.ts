import { FILTER_TYPE } from "../../config/constants";
import { BlogResponse } from "../../shared/types";

export default interface AppContextType {
  blogs: BlogResponse[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  filterType: FILTER_TYPE;
  handleFilter: (filterType: FILTER_TYPE) => void;
}
