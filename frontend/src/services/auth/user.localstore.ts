import { User } from '@/lib/apiClient';

const USER_LOCAL_STORAGE_KEY = 'USER';

const TOKEN_LOCAL_STORAGE_KEY = 'TOKEN';

export function localSaveUser(user: User): void {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
}

export function localGetUser(): User | undefined {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    return user ? JSON.parse(user) : undefined;
  }
}

export function localRemoveUser(): void {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
}
