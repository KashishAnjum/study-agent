'use client'

import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">
        AI Chatbot
      </h1>

      <div className="flex gap-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 p-3 rounded bg-gray-800"
        />

        <button
  onClick={() => alert(message)}
  className="bg-purple-600 px-6 py-3 rounded"
>
  Send
</button>
      </div>
    </main>
  )
}