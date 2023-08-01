'use client';
import { QUERY_KEY, routes } from '@/utils/constants';
import Link from 'next/link';
import React from 'react';
import Button from './Button';
import { useUser } from '@/services/auth/useUser';
import { removeToken } from '@/services/auth/user.localstore';

import { Router } from 'next/router';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const NavigationHeader: React.FunctionComponent<any> = (props) => {
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  return (
    <nav className="flex justify-between p-4">
      <div>
        <h3>Logo</h3>
      </div>
      {!user ? (
        <div className="flex gap-2">
          <Link href={routes.LOGIN}>
            <Button>Login</Button>
          </Link>
          <Link href={routes.REGISTER}>
            <Button>Register</Button>
          </Link>
        </div>
      ) : (
        <Button
          onClick={() => {
            removeToken();
            queryClient.setQueryData([QUERY_KEY.user], null);
            router.replace('/');
          }}
        >
          Logout
        </Button>
      )}
    </nav>
  );
};

export default NavigationHeader;
