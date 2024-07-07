"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.status === 200) {
      const data = await response.json();
      const token = data.token;

      login(token); // Update the auth context

      router.push('/');
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className='flex items-center justify-center mt-20'>
      <div className="w-full max-w-sm p-4 bg-white border border-red-900 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-red-900 dark:text-white">Área de login</h5>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-red-700 dark:text-white">Username</label>
            <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Seu username" required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-red-700 dark:text-white">Password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <button type="submit" className="w-full text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Entrar</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}
