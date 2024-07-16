import { FILTER_TYPE } from "../../config/constants";
import { BlogResponse } from "../../shared/types";

export default interface AppContextType {
  blogs: BlogResponse[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  oldest: boolean;
  newest: boolean;
  popular: boolean;
  handleFilter: (filterType: FILTER_TYPE) => void;
}
