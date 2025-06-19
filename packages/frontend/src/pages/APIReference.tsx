const endpoints = [
  {
    method: 'GET',
    path: '/api/ping',
    description: 'Pings the server, returns the current timestamp',
  },
  {
    method: 'GET',
    path: '/api/info',
    description: 'Requests info about the index, returns { idSize, numDims, dataType, distanceType, schema }',
  },
  {
    method: 'POST',
    path: '/api/search',
    description: 'Searches the index for neighbouring vectors',
  },
  {
    method: 'POST',
    path: '/api/train',
    description: 'Adds new vectors to the index',
  },
  {
    method: 'POST',
    path: '/api/save',
    description: 'Saves the current index in RAM to disk',
  },
]

const methodColors: Record<string, string> = {
  GET: 'bg-blue-100 text-blue-700',
  POST: 'bg-green-100 text-green-700',
}

export default function APIReference() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">API Reference</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10">
        API documentation for the Node.js server. Can be launched through{' '}
        <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm">
          docker compose up -d
        </code>
        .
      </p>

      <div className="space-y-6">
        {endpoints.map((endpoint, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-200 dark:border-zinc-700 rounded-lg p-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded ${methodColors[endpoint.method]}`}
                >
                  {endpoint.method}
                </span>
                <span className="font-mono text-sm">{endpoint.path}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{endpoint.description}</p>
            </div>
            <div className="mt-2 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
              Returns 200 OK
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
