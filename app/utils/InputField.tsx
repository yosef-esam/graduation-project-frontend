import React from 'react';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  id?: string;
  name: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defultValue?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = '',
  type = 'text',
  id,
  name,
  className = '',
  onChange,
  value,
  defultValue,
  required,
}) => {
  return (
    <figure className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defultValue}
        onChange={onChange}
        required={required}
        className="rounded-lg border-2 p-4 normal-case"
      />
    </figure>
  );
};

export default InputField;
