export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold">
            Total Concepts
          </h2>

          <p className="text-3xl mt-4">
            12
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold">
            AI Responses
          </h2>

          <p className="text-3xl mt-4">
            48
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold">
            Saved Chats
          </h2>

          <p className="text-3xl mt-4">
            20
          </p>
        </div>
      </div>
    </main>
  )
}