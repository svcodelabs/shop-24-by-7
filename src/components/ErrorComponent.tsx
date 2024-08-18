import React from "react";
import { MdOutlineErrorOutline } from "react-icons/md";

interface ErrorProps {
  message?: string;
  hasRetry?: boolean;
  onRetry?: () => void;
}

const ErrorComponent: React.FC<ErrorProps> = ({
  message = "",
  hasRetry = false,
  onRetry,
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
  };

  return (
    <div className="w-full min-h-div flex flex-col justify-center items-center p-12 mx-auto my-10">
      <div className="p-4">
        <MdOutlineErrorOutline className="text-8xl text-rose-400 opacity-45" />
      </div>
      <div className="text-xl font-bold text-gray-400">Error Found..!</div>
      {message.trim() !== "" && (
        <div className="text-base font-medium text-gray-500 mt-2">
          {message}
        </div>
      )}
      {hasRetry && (
        <div
          className="flex gap-2 mt-2 justify-center content-center cursor-pointer hover:underline"
          onClick={handleRetry}
        >
          <span className="text-[16px] my-auto">Retry</span>
        </div>
      )}
    </div>
  );
};

export default ErrorComponent;
