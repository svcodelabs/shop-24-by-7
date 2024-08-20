import React, { useState, useRef, useEffect } from "react";

interface Step {
  name: string;
  nxtBtnTitle: string;
  isNxtActive: boolean;
  hasNext: boolean;
  prevBtnTitle: string;
  isPrevActive: boolean;
  hasPrev: boolean;
  Component: React.FC;
}

interface StepperComponentProps {
  stepsList: Step[];
}

const StepperComponent: React.FC<StepperComponentProps> = ({ stepsList }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const stepRef = useRef<(HTMLDivElement | null)[]>([]);
  const [margins, setMargins] = useState<{
    marginLeft: number;
    marginRight: number;
  }>({
    marginLeft: 0,
    marginRight: 0,
  });

  useEffect(() => {
    const firstStep = stepRef.current[0];
    const lastStep = stepRef.current[stepsList.length - 1];

    if (firstStep && lastStep) {
      setMargins({
        marginLeft: firstStep.offsetWidth / 2,
        marginRight: lastStep.offsetWidth / 2,
      });
    }
  }, [stepRef, stepsList.length]);

  if (stepsList.length <= 0) {
    return <></>;
  }

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentStep((prev) => {
      if (currentStep === stepsList.length) {
        setIsCompleted(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  const handlePrevStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentStep((prev) => {
      if (currentStep === stepsList.length) {
        setIsCompleted(false);
        return prev - 1;
      } else {
        return prev - 1;
      }
    });
  };

  const calculateStepPercentWidth = (): number => {
    return ((currentStep - 1) / (stepsList.length - 1)) * 100;
  };

  const ActiveComponent = stepsList[currentStep - 1]?.Component;

  return (
    <>
      <div className="steps-container relative flex justify-between align-middle items-center mb-5">
        {stepsList.map((step, index) => (
          <div
            key={index}
            ref={(r) => (stepRef.current[index] = r)}
            className={`step flex flex-col items-center `}
          >
            <div
              className={`step-number w-8 h-8 rounded-full bg-gray-300 flex justify-center items-center font-semibold z-10 ${
                currentStep === index + 1 ? "step-active" : ""
              } ${
                currentStep > index + 1 || isCompleted ? "step-completed" : ""
              }`}
            >
              {currentStep > index + 1 || isCompleted ? (
                <span>&#10003;</span>
              ) : (
                index + 1
              )}
            </div>
            <div className="text-sm md:text-lg font-medium p-0 pt-1 md:p-2">
              {step.name}
            </div>
          </div>
        ))}

        <div
          className="progress-bar absolute top-[20%] left-0 h-1 bg-gray-200 "
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress h-full bg-purple-500 transition-all duration-300 ease-in-out"
            style={{ width: `${calculateStepPercentWidth()}%` }}
          ></div>
        </div>
      </div>

      {ActiveComponent && <ActiveComponent />}

      <div className="flex justify-end gap-4 my-4 p-4">
        {stepsList[currentStep - 1].hasPrev && (
          <button
            type="button"
            className={`px-4 py-2 text-center text-base font-semibold bg-gray-200 text-gray-900 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-300 ${
              !stepsList[currentStep - 1].isPrevActive
                ? "pointer-events-none cursor-none opacity-65"
                : ""
            }`}
            onClick={handlePrevStep}
          >
            {stepsList[currentStep - 1].prevBtnTitle}
          </button>
        )}
        {stepsList[currentStep - 1].hasNext && (
          <button
            type="button"
            className={`px-4 py-2 text-center text-base font-semibold bg-purple-600 text-white rounded-md transition-all duration-300 ease-in-out hover:bg-opacity-80 ${
              !stepsList[currentStep - 1].isNxtActive
                ? "pointer-events-none cursor-none opacity-65"
                : ""
            }`}
            onClick={handleNextStep}
          >
            {stepsList[currentStep - 1].nxtBtnTitle}
          </button>
        )}
      </div>
    </>
  );
};

export default StepperComponent;
