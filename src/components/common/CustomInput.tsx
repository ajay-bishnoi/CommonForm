import React, { ReactElement } from "react";

interface CustomInputProps {
  type: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
        className={`${className}`}
        value={value}
        name={name}
      />
    </>
  );
};

export default CustomInput;
