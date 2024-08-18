import { IoWarningOutline } from "react-icons/io5";

const NoDataComponent = () => {
  return (
    <div className="w-full min-h-div flex flex-col justify-center items-center p-12 mx-auto my-10">
      <div className="p-4">
        <IoWarningOutline className="text-8xl text-amber-300 opacity-45" />
      </div>
      <div className="text-xl font-bold text-gray-400">No Data Found..!</div>
    </div>
  );
};

export default NoDataComponent;
