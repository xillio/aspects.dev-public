import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "highlight.js/styles/github-dark.css"; // for Request bodies

type Body = {
  mimeType: string;
  language: "typescript" | "text";
  code: string;
};

type Endpoint = {
  method: "GET" | "POST"; // add more when relevant/needed
  path: string;
  description: string;
  request?: Body; // optional
  response?: Body; // optional
};

const endpoints: Endpoint[] = [
  {
    method: "POST",
    path: "/api/init/<index-id>",
    description: "Initializes a new index",
    request: {
      mimeType: "application/json",
      language: "typescript",
      code: `{
  idSize: number;
  numDims?: number;
  dataType?: DataType;
  distanceType?: DistanceType;
  schema?: Array<{
    type: number;
    numDims: number;
    blob: string;
  }>;
}`,
    }
  },
  {
    method: "GET",
    path: "/api/ping/<index-id>",
    description: "Pings the server & index, returns the current timestamp",
    response: {
      mimeType: "application/json",
      language: "typescript",
      code: `{
  timestamp: Date;
}`,
    },
  },
  {
    method: "GET",
    path: "/api/info/<index-id>",
    description: "Requests info about the index",
    response: {
      mimeType: "application/json",
      language: "typescript",
      code: `{
  idSize: number;
  numDims: number;
  dataType: DataType;
  distanceType: DistanceType;
  schema: Array<{
    type: number;
    numDims: number;
    blob: string;
  }>;
}`,
    },
  },
  {
    method: "POST",
    path: "/api/search/<index-id>",
    description: "Searches the index for neighbouring vectors",
    request: {
      mimeType: "application/octet-stream",
      language: "text",
      code: `{
\tk                   4 bytes   uint
\t<Vector Stream>   > 17 bytes
}`,
    },
    response: {
      mimeType: "application/json",
      language: "typescript",
      code: `{
  count: number;
  neighbours: Array<{
    id: string;
    distance: number;
  }>;
}`,
    },
  },
  {
    method: "POST",
    path: "/api/train/<index-id>",
    description: "Adds new vectors to the index",
    request: {
      mimeType: "application/octet-stream",
      language: "text",
      code: `{
\t<Vector Stream>   > 17 bytes
}`,
    },
  },
  {
    method: "POST",
    path: "/api/save/<index-id>",
    description: "Saves the index in RAM to disk",
    // no bodies → nothing will be shown
  },
];

const methodColors: Record<Endpoint["method"], string> = {
  GET: "bg-blue-100 text-blue-700",
  POST: "bg-green-100 text-green-700",
};

export default function APIReference() {
  /** track which card is open */
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">API Reference</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-10">
        API documentation for the Node.js server. Can be launched through{" "}
        <code className="bg-gray-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-sm">
          docker compose up -d
        </code>
        . See the Streaming&nbsp;Structures section in the{" "}
        <a
          className="text-blue-600 hover:underline hover:text-blue-800"
          href="/docs"
        >
          Documentation
        </a>{" "}
        for streaming vectors in the request body.
      </p>

      <div className="space-y-6">
        {endpoints.map((ep, i) => {
          const hasBodies = ep.request || ep.response;
          const isOpen = openIndex === i;

          return (
            <div
              key={ep.path}
              className="border border-gray-200 dark:border-zinc-700 rounded-lg"
            >
              {/* clickable header */}
              <button
                className="w-full flex justify-between items-center p-4 gap-6 text-left"
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        methodColors[ep.method]
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="font-mono text-sm">{ep.path}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {ep.description}
                  </p>
                </div>
                {hasBodies &&
                  (isOpen ? (
                    <ChevronDown className="shrink-0 text-gray-500" />
                  ) : (
                    <ChevronRight className="shrink-0 text-gray-500" />
                  ))}
              </button>

              {/* collapsible body examples */}
              {hasBodies && isOpen && (
                <div className="border-t border-gray-200 dark:border-zinc-700 p-4 space-y-6">
                  {/* request first */}
                  {ep.request && (
                    <BodyBlock
                      title={`Request body (${ep.request.mimeType})`}
                      body={ep.request}
                    />
                  )}
                  {ep.response && (
                    <BodyBlock
                      title={`Response body (${ep.response.mimeType})`}
                      body={ep.response}
                    />
                  )}
                </div>
              )}
              {/* if no bodies, omit the accordion entirely */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function BodyBlock({ title, body }: { title: string; body: Body }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-mono text-gray-500">{title}</p>

      {body.language === "typescript" ? (
        /* Response → Prism style (same as home-page snippets) */
        <SyntaxHighlighter
          language="typescript"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            background: "transparent",
            padding: "1rem",
            borderRadius: "0.375rem",
          }}
        >
          {body.code}
        </SyntaxHighlighter>
      ) : (
        /* Request → plain text, github-dark colours (matches docs) */
        <pre className="hljs bg-gray-100 dark:bg-zinc-950 text-xs text-pink-500 p-4 rounded overflow-x-auto">
          {body.code}
        </pre>
      )}
    </div>
  );
}
