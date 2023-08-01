'use client';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { authApi } from '@/utils/apiClient';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
type FormData = {
  email: string;
};
const ForgotPassword = () => {
  const [isError, setError] = useState<boolean>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async ({ email }: FormData) => {
    try {
      // Send a request to the backend to initiate the password reset process
      await authApi.authControllerSendForgotPassword({ email });
      router.push(`/change-password/${email}`);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full pb-8 bg-white rounded-lg shadow-lg px-4">
          <h1 className="text-3xl font-semibold mb-6">Forgot Password</h1>

          <TextInput
            label="Email"
            name="email"
            register={register}
            error={errors.email}
            type="email"
            pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
          />

          <Button className="my-2">Reset Password</Button>

          {isError !== undefined && (
            <p className={isError ? 'text-red-500' : 'text-blue-300'}>
              {isError
                ? 'Failed to send reset link. Please check your email and try again.'
                : 'Password reset link sent to your email.'}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
