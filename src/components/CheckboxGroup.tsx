import React from "react";

interface CheckboxOptions {
  label: string;
  value: string;
}

interface CheckboxProps {
  options: CheckboxOptions[];
  selectedValues: string[];
  onChange?: (selectedValue: string[]) => void;
  className?: string;
}

const CheckboxGroup: React.FC<CheckboxProps> = ({
  options,
  selectedValues,
  onChange,
  className,
}) => {
  const handleChange = (value: string) => {
    let updatedValues: string[];

    if (selectedValues.includes(value)) {
      updatedValues = selectedValues.filter((item) => item !== value);
    } else {
      updatedValues = [...selectedValues, value];
    }

    if (onChange) {
      onChange(updatedValues);
    }
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className="inline-flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedValues.includes(option.value)}
            onChange={() => handleChange(option.value)}
            className="h-4 w-4 text-rose-600 bg-gray-100 border-gray-300 rounded focus:ring-rose-500"
          />
          <span className="ml-2 text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
