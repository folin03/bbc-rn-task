import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

// create an axios instance for newsapi calls
export const apiClient = axios.create({
  baseURL: 'https://newsapi.org/v2',
  timeout: 10000,
});
