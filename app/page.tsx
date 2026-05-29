'use client'

import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')

  const handleSend = async () => {
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
      <h1 className="text-3xl font-bold mb-6">
        Study Agent
      </h1>

      <div className="flex gap-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 p-3 rounded bg-gray-800"
        />

        <button
          onClick={handleSend}
          className="bg-purple-600 px-6 py-3 rounded"
        >
          Send
        </button>
      </div>

      {response && (
        <div>
          <div className="mt-6 p-4 bg-gray-800 rounded whitespace-pre-wrap">
            {response}
          </div>

          <button
            onClick={handleSave}
            className="mt-4 bg-green-600 px-4 py-2 rounded"
          >
            Save Progress
          </button>
        </div>
      )}
    </main>
  )
} 