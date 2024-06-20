// src/hooks/useAuthenticatedFetch.js
import { useRouter } from 'next/navigation';

export default function useAuthenticatedFetch() {
  const router = useRouter();

  const authenticatedFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    if (!options.headers) {
      options.headers = {};
    }

    options.headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(url, options);

    if (response.status === 401) {
      router.push('/login');  // Replace '/login' with your login page route
      return null;
    }

    return response;
  };

  return authenticatedFetch;
}
