// src/context/auth-context.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type User, type Task } from '@/types';
import { useTaskStore } from '@/store/task-store';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchTasks: () => Promise<Task[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

import { BACKEND_BASE_URL } from '@/constants/api';

const AUTH_API_URL = `${BACKEND_BASE_URL}/api/auth`;
const USER_API_URL = `${BACKEND_BASE_URL}/api/tasks/user`;
const TASKS_API_URL = `${BACKEND_BASE_URL}/api/tasks`;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { clearTasks } = useTaskStore.getState();

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    clearTasks();
    if (pathname !== '/login') {
        router.push('/login');
    }
  }, [router, clearTasks, pathname]);

  const fetchUserData = useCallback(async (token: string) => {
    try {
      const res = await fetch(USER_API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        // Se a busca de usuário falhar (ex: token expirado), deslogue
        logout();
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        await fetchUserData(storedToken);
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, [fetchUserData]);

  useEffect(() => {
    if (!isLoading && !token && pathname !== '/login' && pathname !== '/register') {
      router.push('/login');
    }
  }, [isLoading, token, pathname, router]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${AUTH_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || 'Falha no login');
    }

    const data = await res.json();
    localStorage.setItem('token', data.token);
    setToken(data.token);
    await fetchUserData(data.token);
    // Não redirecionamos mais aqui, o hook useEffect cuidará disso
  };

  const register = async (username: string, email: string, password: string) => {
    const res = await fetch(`${AUTH_API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || 'Falha no registro');
    }
  };

  const fetchTasks = useCallback(async (): Promise<Task[]> => {
    const currentToken = get().token;
    if (!currentToken) {
      // throw new Error('No authentication token found.');
      return []; // Retorna array vazio se não houver token
    }
    try {
      const res = await fetch(TASKS_API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        if (res.status === 401) {
          logout();
        }
        throw new Error('Failed to fetch tasks.');
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }, [logout]);
  
  // hook para pegar o token atualizado
  const get = () => ({ token });

  const value = {
    isAuthenticated: !!token,
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    fetchTasks,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
