import { AxiosError } from 'axios';

export const useNewsApiErrorProcessor = (error?: AxiosError) => {
  switch (error?.status) {
    case 429:
      return 'we have reached our app alowance. Please try again later.';
    case 500:
      return 'Server error occurred. Please try again later.';
    default:
      return 'An unexpected error occurred. Please try again later.';
  }
};
