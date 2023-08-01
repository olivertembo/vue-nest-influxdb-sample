'use client';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { authApi } from '@/utils/apiClient';
import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
type FormData = {
  newPassword: string;
  verifyPassword: string;
  code: string;
};
const ChangePassword = () => {
  const { email } = useParams();
  const router = useRouter();
  const decodedEmail = decodeURIComponent(email as string);

  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleChangePassword = async ({
    newPassword,
    verifyPassword,
    code,
  }: FormData) => {
    try {
      // Validate that new password and verify password match
      if (newPassword !== verifyPassword) {
        setMessage('New password and verify password must match.');
        return;
      }

      // Send a request to the backend to change the password
      await authApi.authControllerVerificationForgotPassword({
        email: decodedEmail,
        code,
        password: newPassword,
      });

      setMessage('Password changed successfully.');
      router.replace('/');
    } catch (error) {
      setMessage('Failed to change password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6">Change Password</h1>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          {/* New Password */}
          <div className="mb-4">
            <TextInput
              label="New Password"
              name="newPassword"
              register={register}
              error={errors.newPassword}
              type="password"
            />
          </div>

          {/* Verify Password */}
          <div className="mb-4">
            <TextInput
              label="Verify Password"
              name="verifyPassword"
              register={register}
              error={errors.verifyPassword}
              type="password"
            />
          </div>

          {/* Code */}
          <div className="mb-4">
            <TextInput
              label="Code"
              name="code"
              register={register}
              error={errors.code}
              type="number"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4 text-center">
            <Button className="bg-blue-600 text-white rounded-md px-4 py-2">
              Change Password
            </Button>
          </div>

          {message && (
            <p className="text-center mt-2 text-red-500">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
