"use client"
import styles from './login.module.css'
import { useState } from 'react'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

const baseUrl =
    (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();
    const [error, setError] = useState('');

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

            localStorage.setItem('token', token)

            router.push('/')
        } else {
            setError('Credenciais inválidas')
        }
    }

    return <div className={styles.container}>
        <h1>Login</h1>
        <div className={styles.principal}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    </div>
}