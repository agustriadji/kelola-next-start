'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useAuthStore } from '@/store/authentication/signInStore'

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulasi login
    const success = await fakeLogin(username, password)
    if (success) {
      setUser({ username })
      router.push('/')
    } else {
      alert('Login gagal')
    }
  }

  async function fakeLogin(username: string, password: string) {
    await new Promise((r) => setTimeout(r, 500))
    return username === 'agus' && password === '123'
  }

  return (
    <div className="h-screen flex flex-col bg-[url('/bg-login.webp')] bg-cover">
      <div className="max-w-sm mx-auto mt-60 backdrop-blur-sm">
        <form
          className="space-y-4 bg-white bg-opacity-75 p-6 rounded-md shadow max-w-md w-full"
          onSubmit={handleLogin}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex flex-col mt-4 gap-2">
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded mt-2">
              Sign In
            </button>
            <button className="w-full bg-white text-gray-600 border-2 py-2 rounded mt-2">
              Sign in using root user email
            </button>
            <button className="text-blue-600 hover:underline text-sm">Create a new account</button>
          </div>
        </form>
      </div>
    </div>
  )
}
