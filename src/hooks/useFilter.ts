import { useState } from "react";
import { FILTER_TYPE } from "../config/constants";

export default function useFilter() {
  const [filterType, setFilterType] = useState<FILTER_TYPE>(FILTER_TYPE.OLDEST);

  function handleFilter(selectedFilterType: FILTER_TYPE) {
    setFilterType(() => selectedFilterType);
  }

  return { filterType, handleFilter };
}
