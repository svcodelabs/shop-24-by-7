import React from "react";

interface RadioOptions {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOptions[];
  name: string;
  onChange: (value: string) => void;
  className: string;
  value: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  onChange,
  className = "",
  value,
}) => {
  // const [selectedValue, setSelectedValue] = useState<string>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setSelectedValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
            className="h-4 w-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
          />
          <span className="ml-2 text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
