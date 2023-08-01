import {
  Configuration,
  AuthApi,
  UsersApi,
  EventsApi,
  MusicPreferencesApi,
} from '@/lib/apiClient';

import { LOCAL_STORAGE_KEY } from '@/type/localStorage';

const accessToken =
  typeof window !== 'undefined'
    ? localStorage.getItem(LOCAL_STORAGE_KEY.access_token)
    : undefined;

const config = accessToken
  ? {
      basePath: 'http://localhost:4000',
      accessToken,
    }
  : {
      basePath: 'http://localhost:4000',
    };

// Create a configuration with the base URL of your locally hosted API server
const apiConfig = new Configuration(config);

// Create an instance of the generated API client
export const authApi = new AuthApi(apiConfig);
export const usersApi = new UsersApi(apiConfig);
export const musicPreferencesApi = new MusicPreferencesApi(apiConfig);
