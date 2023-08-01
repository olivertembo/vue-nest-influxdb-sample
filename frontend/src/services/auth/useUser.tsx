'use client';
import { QUERY_KEY } from '@/utils/constants';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import * as userLocalStorage from './user.localstore';
import { authApi } from '@/utils/apiClient';

export function useUser() {
  const { data: user, isError } = useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: async () => (await authApi.authControllerGetProfile()).data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: userLocalStorage.localGetUser,
  });

  useEffect(() => {
    if (!user || isError) {
      userLocalStorage.localRemoveUser();
    } else {
      userLocalStorage.localSaveUser(user);
    }
  }, [user, isError]);

  return {
    user: user ?? null,
  };
}
