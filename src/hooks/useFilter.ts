import { useState } from "react";
import { FILTER_TYPE } from "../config/constants";

export default function useFilter() {
  const [oldest, setOldest] = useState<boolean>(true);
  const [newest, setNewest] = useState<boolean>(false);
  const [popular, setPopular] = useState<boolean>(false);

  function handleFilter(filterType: FILTER_TYPE) {
    switch (filterType) {
      case FILTER_TYPE.OLDEST:
        setOldest(() => true);
        setNewest(() => false);
        setPopular(() => false);
        break;

      case FILTER_TYPE.NEWEST:
        setOldest(() => false);
        setNewest(() => true);
        setPopular(() => false);
        break;

      case FILTER_TYPE.POPULAR:
        setOldest(() => false);
        setNewest(() => false);
        setPopular(() => true);
        break;
    }
  }

  return { oldest, newest, popular, handleFilter };
}
