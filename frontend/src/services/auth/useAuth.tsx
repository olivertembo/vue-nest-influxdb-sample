import { User } from '@/lib/apiClient';
import {
  useQueryClient,
  useMutation,
  UseMutateFunction,
  useQuery,
} from '@tanstack/react-query';
import { useRouter } from 'next/router';
import useSnackbar from '../common/useSnackbar';
import { authApi, musicPreferencesApi } from '@/utils/apiClient';
import { QUERY_KEY } from '@/utils/constants';
import globalAxios from 'axios';

interface FormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}
export function useAllMusicArtists() {
  const { data: artists, isError } = useQuery({
    queryKey: [QUERY_KEY.musicArtist],
    queryFn: async () =>
      (await musicPreferencesApi.musicPreferenceControllerGetAllArtists()).data,
  });

  return {
    artists: artists ?? null,
  };
}
export function useSignUp() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showError } = useSnackbar();

  const { mutate: signUpMutation, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await authApi.authControllerRegister({
        ...data,
      });
      return res.data;
    },
    onSuccess: ({ user, access_token }) => {
      queryClient.setQueryData([QUERY_KEY.user], user);
      globalAxios.defaults.headers.common = {
        Authorization: `Bearer ${access_token}`,
      };
      router.push('/');
    },
    onError: (error) => {
      showError('Ops.. Error on sign in. Try again!');
    },
  });

  return { signUpMutation };
}
