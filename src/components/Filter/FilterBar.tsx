import { FILTER_TYPE } from "../../config/constants";

interface FilterBarProps {
  filterType: FILTER_TYPE;
  setFilterType: React.Dispatch<React.SetStateAction<FILTER_TYPE>>;
}

function FilterBar({ filterType, setFilterType }: FilterBarProps) {
  return (
    <>
      <div className="h-12 text-md md:text-lg w-full bg-gray-100 rounded-lg flex justify-between">
        <div
          className={`flex justify-center items-center w-1/3 cursor-pointer hover:bg-gray-200 duration-300 ${filterType === FILTER_TYPE.OLDEST ? "border-b-2 border-gray-800" : ""}`}
          onClick={(_e) => setFilterType(FILTER_TYPE.OLDEST)}
        >
          Oldest
        </div>
        <div
          className={`flex justify-center items-center w-1/3 cursor-pointer hover:bg-gray-200 duration-300 ${filterType === FILTER_TYPE.NEWEST ? "border-b-2 border-gray-800" : ""}`}
          onClick={(_e) => setFilterType(FILTER_TYPE.NEWEST)}
        >
          Newest
        </div>
        <div
          className={`flex justify-center items-center w-1/3 cursor-pointer hover:bg-gray-200 duration-300 ${filterType === FILTER_TYPE.POPULAR ? "border-b-2 border-gray-800" : ""}`}
          onClick={(_e) => setFilterType(FILTER_TYPE.POPULAR)}
        >
          Popular
        </div>
      </div>
    </>
  );
}

export default FilterBar;
