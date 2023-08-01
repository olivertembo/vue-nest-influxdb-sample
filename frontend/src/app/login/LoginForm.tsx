'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '@/components/TextInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/utils/api';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { saveToken, localSaveUser } from '@/services/auth/user.localstore';
import { authApi } from '@/utils/apiClient';
import globalAxios from 'axios';

import { QUERY_KEY } from '@/utils/constants';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import api from '@/utils/api';
import Link from 'next/link';

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await authApi.authControllerLogin(data);
      return res.data;
    },
    onSuccess: ({ access_token, user }) => {
      saveToken(access_token);
      localSaveUser(user);
      queryClient.setQueryData([QUERY_KEY.user], user);
      globalAxios.defaults.headers.common = {
        Authorization: `Bearer ${access_token}`,
      };
      router.push('/');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    mutate(data);
  };
  const responseFacebook = async (response: any) => {
    try {
      const { accessToken, userID } = response;

      const res = await api.get('/auth/facebook/callback', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      router.replace('/');
      const { user, token } = res.data;
      if (user && token) {
        localSaveUser(user);
        globalAxios.defaults.headers.common = {
          Authorization: `Bearer ${token}`,
        };
        queryClient.setQueryData([QUERY_KEY.user], user);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const responseGoogle: (response: any) => void = async (response) => {
    try {
      const { profile, accessToken, tokenId } = response;

      const res = await api.get('/auth/google/callback', {
        headers: { tokenId },
      });

      // You can handle the backend response here and redirect the user to the dashboard or any other page.

      const { user, token } = res.data;
      if (user && token) {
        localSaveUser(user);
        globalAxios.defaults.headers.common = {
          Authorization: `Bearer ${token}`,
        };
        queryClient.setQueryData([QUERY_KEY.user], user);
      }
      router.replace('/');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 gap-1">
        <TextInput
          label="Email"
          name="email"
          register={register}
          error={errors.email}
          type="email"
          pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
        />

        <TextInput
          label="Password"
          name="password"
          register={register}
          error={errors.password}
          type="password"
        />
      </div>

      <div className="flex justify-end">
        <Button disabled={isPending}>Login</Button>
      </div>
      <div className="flex  flex-col">
        <p className="p-4 text-center">--- Or ---</p>

        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          style={{
            width: '100%',
            backgroundColor: 'red',
            flex: 1,
            display: 'flex',
            height: '80px',
          }}
          cookiePolicy={'single_host_origin'}
        />

        <FacebookLogin
          containerStyle={{ padding: 0, marginTop: 16 }}
          buttonStyle={{
            padding: 8,
            margin: 0,
            width: '100%',
            textAlign: 'left',
          }}
          appId={process.env.NEXT_PUBLIC_FACEBOOK_ID ?? ''}
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
        />
        <div className="mt-4 text-right">
          <Link className="text-blue-600 underline" href="/forgot-password">
            Forgot Password?
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
