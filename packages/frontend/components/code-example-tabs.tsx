"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const codeExamples = {
  search: `import { Client as Aspects, Model, OpenAI, Ollama } from "aspects.dev";

// Create aspects/client.
const aspects = new Aspects({ baseUrl: "http://localhost:8000" });

// Define a model.
const { schema } = await aspects.info();
const generator = new OpenAI({ apiKey, model: "gpt-4.1" });
const embedder = new Ollama({ host: "http://localhost:11434", embedModel: "nomic-embed-text" });
const model = new Model({ schema, generator, embedder });

// Perform a query.
const vec = await model.analyze("Please retrieve all pdf documents from 2005 related to the Manhattan Project");
const results = await aspects.search([vec], 25);`,
  train: `import { Client as Aspects, Model, Ollama } from "aspects.dev";

// Create aspects/client.
const aspects = new Aspects({ baseUrl: "http://localhost:8000" });

// Define a model.
const { schema } = await aspects.info();
const embedder = new Ollama({ host: "http://localhost:11434", embedModel: "nomic-embed-text" });
const model = new Model({ schema, embedder });

// Train the index.
const vec = await model.analyze(document);
await aspects.train([document.id], [vec]);`,
  init: `import { init, MultiLangResolver, LangResolver, DataType, DistanceType } from "aspects.dev";

const formats = [
  "entertaining article",
  "image description",
  ...
];

const lastNames = [
  "Whittaker",
  "Haverford",
  ...
];

// Define a schema.
const schema = [
  // When given a document, the "format" property is read.
  MultiLangResolver.aspect.radial("$.format", formats, {
      name: "format",
      description: "a string that describes the format of the document"
  }),

  // When given a document, the "lastName" property is read.
  MultiLangResolver.aspect.radial("$.lastName", lastNames, {
      name: "author",
      description: "a string that describes the author of the document"
  }),

  // When given a document, the "content" property is read.
  LangResolver.aspect("$.content", numDims)
];

// Initialize an index.
await init({
  execFile,       // Location of aspects.cli.
  indexDirectory, // Directory must already exist.
  idSize,
  schema,
  dataType: DataType.Float,
  distanceType: DistanceType.Cosine
});`
};

export function CodeExampleTabs() {
  const [activeTab, setActiveTab] = useState("search");
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab as keyof typeof codeExamples]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <Tabs defaultValue="typescript" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="search">search</TabsTrigger>
            <TabsTrigger value="train">train</TabsTrigger>
            <TabsTrigger value="init">initialize</TabsTrigger>
          </TabsList>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyCode}
            className="mr-2"
          >
            {copied ? "Copied!" : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        {Object.entries(codeExamples).map(([language, code]) => (
          <TabsContent key={language} value={language} className="mt-0">
            <pre className={cn(
              "p-4 rounded-md bg-muted overflow-auto text-sm",
              {
                "bg-zinc-950 text-zinc-50 dark:bg-zinc-900": true,
              }
            )}>
              <code>{code}</code>
            </pre>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
