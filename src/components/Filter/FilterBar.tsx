import { AppContext } from "../../contexts/AppContext/AppContext";
import { FILTER_TYPE } from "../../config/constants";
import { useContext } from "react";

function FilterBar() {
  const { oldest, newest, popular, handleFilter } = useContext(AppContext);

  return (
    <>
      <div className="h-12 text-lg w-full bg-gray-100 rounded-lg flex justify-between">
        <div
          className={`flex justify-center items-center w-1/3 cursor-pointer hover:bg-gray-200 duration-300 ${oldest ? "border-b-2 border-gray-800" : ""}`}
          onClick={(_e) => handleFilter(FILTER_TYPE.OLDEST)}
        >
          Oldest
        </div>
        <div
          className={`flex justify-center items-center w-1/3 cursor-pointer hover:bg-gray-200 duration-300 ${newest ? "border-b-2 border-gray-800" : ""}`}
          onClick={(_e) => handleFilter(FILTER_TYPE.NEWEST)}
        >
          Newest
        </div>
        <div
          className={`flex justify-center items-center w-1/3 cursor-pointer hover:bg-gray-200 duration-300 ${popular ? "border-b-2 border-gray-800" : ""}`}
          onClick={(_e) => handleFilter(FILTER_TYPE.POPULAR)}
        >
          Popular
        </div>
      </div>
    </>
  );
}

export default FilterBar;
