'use client';
import React, { useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface TextInputProps {
  label: string;
  name: string;
  register?: UseFormRegister<any>; // Adjust this type if you need more specific form data types
  error: FieldError | undefined;
  type?: string;
  pattern?: RegExp;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  register,
  error,
  type = 'text',
  pattern,
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-bold">
        {label}
      </label>
      <div className="relative">
        <input
          type={isPasswordVisible ? 'text' : type}
          id={name}
          {...register?.(name, { required: `${label} is required`, pattern })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-2 focus:outline-none text-gray-500 w-5"
          >
            {isPasswordVisible ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
        )}
      </div>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default TextInput;
