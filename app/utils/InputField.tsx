import React from 'react';

interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute; // <-- built-in type-safe input types
  id: string;
  name: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder = '',
  type = 'text',
  id,
  name,
  className = '',
}) => {
  return (
    <figure className={`flex  flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="rounded-lg border-2 p-4"
      />
    </figure>
  );
};

export default InputField;
