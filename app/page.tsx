'use client'

import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    setLoading(true)

    const conceptRes = await fetch('/api/detect-concept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMessage: message,
      }),
    })

    const conceptData = await conceptRes.json()

    const chatRes = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMessage: message,
        subject: conceptData.subject,
        concept: conceptData.concept,
      }),
    })

    const chatData = await chatRes.json()

    setResponse(chatData.answer)
    setLoading(false)
  }

  const handleSave = async () => {
    const res = await fetch('/api/save-concept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: 'Biology',
        concept: 'Photosynthesis',
      }),
    })

    const data = await res.json()

    alert(JSON.stringify(data))
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        Study Agent 🚀
      </h1>

      <p className="text-gray-400 mb-8">
        Your AI Learning Companion
      </p>

      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-green-400">
          Online
        </span>
      </div>

      <div className="flex gap-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 p-3 rounded-xl bg-gray-800 border border-gray-700"
        />

        <button
          onClick={handleSend}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl"
        >
          Send
        </button>
      </div>

      {loading && (
        <div className="mt-6 text-purple-400">
          AI is thinking...
        </div>
      )}

      {response && (
        <div>
          <div className="mt-6 p-5 bg-gray-800 rounded-2xl whitespace-pre-wrap border border-gray-700 shadow-lg">
            {response}
          </div>

          <button
            onClick={handleSave}
            className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl"
          >
            Save Progress
          </button>
        </div>
      )}
    </main>
  )
}