import React from 'react';
import LoginForm from './LoginForm';
const Login = () => {
  return (
    <div className="p-4">
      <div className="bg-gray-200 p-8 rounded-md shadow-md mx-auto max-w-lg mt-5 md:mt-20">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
