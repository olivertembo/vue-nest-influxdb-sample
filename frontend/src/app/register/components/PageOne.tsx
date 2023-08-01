// components/PageOne.tsx
import React from 'react';

type PageOneProps = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
};

const PageOne: React.FC<PageOneProps> = ({ formData, onChange, onNext }) => {
  const { firstName, lastName, email, password, username } = formData;

  return (
    <div className="py-4 bg-gray-300 max-w-xl mx-auto rounded px-8  ">
      <h1 className="text-3xl font-bold mb-6">Page One</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-lg font-semibold text-primary mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={onChange}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-primary mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={onChange}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-primary mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={onChange}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-primary mb-2">
          User Name:
        </label>
        <input
          type="username"
          id="username"
          name="username"
          value={username}
          onChange={onChange}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-primary mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onChange}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-4 py-2 text-white font-semibold bg-primary rounded-md hover:bg-opacity-90"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PageOne;
