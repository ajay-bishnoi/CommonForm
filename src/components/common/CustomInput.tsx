import React from "react";

interface CustomInputProps {
  type: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  className,
  value,
  name,
  onChange,
}) => {
  return (
    <>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-solid w-full border-gray-200 p-3 outline-none ${className}`}
        value={value}
        name={name}
      />
    </>
  );
};

export default CustomInput;
