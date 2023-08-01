import { classNames } from '@/utils/className';
import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={classNames(
        'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
