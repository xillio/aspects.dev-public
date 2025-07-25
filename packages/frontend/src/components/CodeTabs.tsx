import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "../lib/utils";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeExamples: Record<string, string> = {
  search: `import { Client as Aspects, Model, OpenAI, Ollama } from "aspects.dev";

// Create aspects/client.
const aspects = new Aspects({ baseUrl: "http://localhost:8000", indexId: "example" });

// Define a model.
const { schema } = await aspects.info();
const generator = new OpenAI({ apiKey, model: "gpt-4.1" });
const embedder = new Ollama({ host: "http://localhost:11434", embedModel: "nomic-embed-text" });
const model = new Model({ schema, generator, embedder });

// Perform a query.
const vec = await model.analyze("Please retrieve some blog posts about computers written by Whittaker.");
const results = await aspects.search([vec], 25);`,

  train: `import { Client as Aspects, Model, Ollama } from "aspects.dev";

// Create aspects/client.
const aspects = new Aspects({ baseUrl: "http://localhost:8000", indexId: "example" });

// Define a model.
const { schema } = await aspects.info();
const embedder = new Ollama({ host: "http://localhost:11434", embedModel: "nomic-embed-text" });
const model = new Model({ schema, embedder });

// Train the index.
const vec = await model.analyze(document);
await aspects.train([document.id], [vec]);`,

  initialize: `import { init, MultiLangResolver, LangResolver, DataType, DistanceType } from "aspects.dev";

const formats = [
  "technical article",
  "blog post",
  ...
];

const lastNames = [
  "Whittaker",
  "Haverford",
  ...
];

// Define a schema.
const schema = [
  // We use generative AI for multi aspect extraction during search,
  // to do this, supply a name and description.
  // During training, we simply read properties from the given documents.

  // When given a document, the "format" property is read.
  MultiLangResolver.aspect.enum("$.format", formats, {
    name: "format",
    description: "a string that describes the format of the document"
  }),

  // When given a document, the "lastName" property is read.
  MultiLangResolver.aspect.enum("$.lastName", lastNames, {
    name: "author",
    description: "a string that describes the author of the document"
  }),

  // When given a document, the "createdAt" property is read.
  MultiLangResolver.aspect.dateTime("$.createdAt", "years:2020-2025", {
    name: "createdAt",
    description: "a string that describes the date the document was created at"
  }),

  // For the content embedding we use a simple embedding model.
  // We use nomic-embed-text from Ollama, which uses 768 dimensions.

  // When given a document, the "content" property is read.
  MultiLangResolver.aspect.embed("$.content", 768, {
    name: "description",
    description: "a string that describes the content of the document"
  })
];

// Initialize an index.
// This will initialize a single index,
// to run a server, make it point to its parent folder, in which multiple indices may live.
await init({
  execFile,       // Location of aspects.cli.
  indexDirectory, // Directory must already exist.
  idSize,         // Maximum idSize for all vectors.
  schema,
  dataType: DataType.Float,
  distanceType: DistanceType.Cosine
});`,
};

const tabs = Object.keys(codeExamples);

export default function CodeTabs() {
  const [activeTab, setActiveTab] = useState("search");
  const [copied, setCopied] = useState(false);

  const code = codeExamples[activeTab];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-md overflow-hidden w-full max-w-3xl">
      <div className="flex justify-between items-center px-3 pt-2">
        {/* Tabs */}
        <div className="flex space-x-1 ">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "text-sm px-3 py-1 rounded-t-md",
                activeTab === tab
                  ? "bg-white dark:bg-zinc-900 font-semibold"
                  : "text-gray-500 hover:text-black dark:hover:text-white"
              )}
              disabled={activeTab === tab}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="p-2 text-sm text-gray-500 hover:text-black dark:hover:text-white"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Divider between tabs and code block */}
      <div className="border-t border-gray-200 dark:border-zinc-700" />

      {/* Code block */}
      <div className="bg-zinc-900 text-white rounded-b-lg">
        <SyntaxHighlighter
          language="tsx"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1rem",
            backgroundColor: "transparent",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
