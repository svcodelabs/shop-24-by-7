import { ImSpinner2 } from "react-icons/im";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-200 bg-opacity-65 z-50">
      <ImSpinner2 className="text-fuchsia-600 animate-spin text-5xl md:text-6xl" />
      <span className="ml-4 text-lg font-medium text-gray-700">Loading...</span>
    </div>
  );
};

export default LoadingScreen;
