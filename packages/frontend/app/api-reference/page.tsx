import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Database, Server, Code, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const ApiEndpoint = ({
  method,
  path,
  description,
  responseCode = 200
}: {
  method: string;
  path: string;
  description: string;
  responseCode?: number;
}) => {
  const getMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case 'get': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'post': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'put': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'delete': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="border rounded-md p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${getMethodColor(method)}`}>
            {method}
          </span>
          <code className="text-sm font-mono bg-muted px-2 py-1 rounded">{path}</code>
        </div>
        <span className="text-xs text-muted-foreground">
          {responseCode === 200 ? 'Returns 200 OK' : `Returns ${responseCode}`}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default function ApiReferencePage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl lg:text-5xl">
            API Reference
          </h1>
          <p className="text-xl text-muted-foreground">
            API documentation for the Node.js server. Can be launched through <code className="text-sm font-mono bg-muted px-2 py-1 rounded">docker compose up -d</code>.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <Tabs defaultValue="rest" className="w-full">
          {/*<TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rest">REST API</TabsTrigger>
            <TabsTrigger value="python">Python Client</TabsTrigger>
            <TabsTrigger value="typescript">TypeScript Client</TabsTrigger>
          </TabsList>*/}
          <TabsContent value="rest" className="space-y-4">
            <div className="mt-6">
              <ApiEndpoint
                method="GET"
                path="/api/ping"
                description="Pings the server, returns the current timestamp"
              />
              <ApiEndpoint
                method="GET"
                path="/api/info"
                description="Requests info about the index, returns { idSize, numDims, dataType, distanceType, schema }"
              />
              <ApiEndpoint
                method="POST"
                path="/api/search"
                description="Searches the index for neighbouring vectors"
              />
              <ApiEndpoint
                method="POST"
                path="/api/train"
                description="Adds new vectors to the index"
              />
              <ApiEndpoint
                method="POST"
                path="/api/save"
                description="Saves the current index in RAM to disk"
              />
            </div>

            {/*<div className="mt-6">
              <h2 className="flex items-center text-xl font-semibold mb-4">
                <Database className="mr-2 h-5 w-5" />
                Collection Management
              </h2>
              <div className="space-y-2">
                <ApiEndpoint
                  method="POST"
                  path="/v1/collections"
                  description="Create a new collection with the specified configuration"
                />
                <ApiEndpoint
                  method="GET"
                  path="/v1/collections"
                  description="List all available collections"
                />
                <ApiEndpoint
                  method="GET"
                  path="/v1/collections/{collection_name}"
                  description="Get details for a specific collection"
                />
                <ApiEndpoint
                  method="DELETE"
                  path="/v1/collections/{collection_name}"
                  description="Delete a collection and all its data"
                />
              </div>
            </div>

            <div className="mt-6">
              <h2 className="flex items-center text-xl font-semibold mb-4">
                <Server className="mr-2 h-5 w-5" />
                Document Operations
              </h2>
              <div className="space-y-2">
                <ApiEndpoint
                  method="POST"
                  path="/v1/collections/{collection_name}/documents"
                  description="Add documents with vector embeddings to a collection"
                />
                <ApiEndpoint
                  method="GET"
                  path="/v1/collections/{collection_name}/documents/{document_id}"
                  description="Retrieve a specific document by ID"
                />
                <ApiEndpoint
                  method="PUT"
                  path="/v1/collections/{collection_name}/documents/{document_id}"
                  description="Update an existing document"
                />
                <ApiEndpoint
                  method="DELETE"
                  path="/v1/collections/{collection_name}/documents/{document_id}"
                  description="Delete a document from the collection"
                />
              </div>
            </div>

            <div className="mt-6">
              <h2 className="flex items-center text-xl font-semibold mb-4">
                <Search className="mr-2 h-5 w-5" />
                Search & Query
              </h2>
              <div className="space-y-2">
                <ApiEndpoint
                  method="POST"
                  path="/v1/collections/{collection_name}/search"
                  description="Perform vector similarity search on a collection"
                />
                <ApiEndpoint
                  method="POST"
                  path="/v1/collections/{collection_name}/query"
                  description="Execute metadata filters with optional vector search"
                />
                <ApiEndpoint
                  method="POST"
                  path="/v1/collections/{collection_name}/hybrid-search"
                  description="Perform hybrid search combining vector similarity and keyword matching"
                />
              </div>
            </div>*/}

            {/*<div className="flex justify-center mt-8">
              <Link href="/api-reference/rest">
                <Button>View Full REST API Documentation</Button>
              </Link>
            </div>*/}
          </TabsContent>

          {/*<TabsContent value="python" className="space-y-4">
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Python Client API</h2>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm">
                  <code>{`# Installation
pip install aspects-client

# Basic usage
from aspects import AspectsClient

client = AspectsClient(
    host="localhost",
    port=8080
)

# Create a collection
client.create_collection(
    name="documents",
    vector_dimension=1536
)

# Add documents
client.add_documents("documents", [
    {
        "id": "doc1",
        "text": "Sample document",
        "embedding": [0.1, 0.2, ...], # 1536-dimensional vector
        "metadata": {
            "source": "website",
            "author": "John Doe"
        }
    }
])

# Search
results = client.search(
    collection_name="documents",
    query_vector=[0.2, 0.3, ...],
    limit=5
)`}</code>
                </pre>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Link href="/api-reference/python">
                <Button>View Full Python API Documentation</Button>
              </Link>
            </div>
          </TabsContent>*/}

          <TabsContent value="typescript" className="space-y-4">
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">TypeScript Client API</h2>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm">
                  <code>{`// Installation
npm install aspects-client

// Basic usage
import { AspectsClient } from 'aspects-client';

const client = new AspectsClient({
  host: 'localhost',
  port: 8080
});

// Create a collection
await client.createCollection({
  name: 'documents',
  vectorDimension: 1536
});

// Add documents
await client.addDocuments('documents', [
  {
    id: 'doc1',
    text: 'Sample document',
    embedding: [0.1, 0.2, ...], // 1536-dimensional vector
    metadata: {
      source: 'website',
      author: 'John Doe'
    }
  }
]);

// Search
const results = await client.search({
  collectionName: 'documents',
  queryVector: [0.2, 0.3, ...],
  limit: 5
});`}</code>
                </pre>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Link href="/api-reference/typescript">
                <Button>View Full TypeScript API Documentation</Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        {/*<div className="grid gap-6 pt-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Client Libraries
              </CardTitle>
              <CardDescription>
                Official client libraries for different programming languages.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <Link
                    href="/api-reference/python"
                    className="font-medium hover:underline"
                  >
                    Python Client
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api-reference/typescript"
                    className="font-medium hover:underline"
                  >
                    TypeScript/JavaScript Client
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api-reference/golang"
                    className="font-medium hover:underline"
                  >
                    Go Client
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                API Endpoints
              </CardTitle>
              <CardDescription>
                REST API documentation for direct API access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <Link
                    href="/api-reference/rest/collections"
                    className="font-medium hover:underline"
                  >
                    Collections API
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api-reference/rest/documents"
                    className="font-medium hover:underline"
                  >
                    Documents API
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api-reference/rest/search"
                    className="font-medium hover:underline"
                  >
                    Search API
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>*/}
      </div>
    </div>
  );
}
