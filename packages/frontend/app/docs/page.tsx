import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Book, Code, BarChart3, Server, Zap, Boxes } from "lucide-react";
import { cn } from "@/lib/utils";

const schema1 =
`DataType (uint)
{
	float   0  (d = 4 bytes)
	double  1  (d = 8 bytes)
}

Vector Stream
{
	idSize             4 bytes       uint
	numDims            4 bytes       uint
	dataType           1 byte        DataType
	count              8 bytes       uint

	v[1].id            idSize bytes  raw bytes
	v[1][1]            d bytes       dataType (\`d\` is determined by dataType)
	...                ...           ...
	v[1][numDims]      d bytes       dataType

	v[2].id            "             "
	v[2][1]            "             "
	...                "             "
	v[2][numDims]      "             "

	...                "             "
	...                "             "

	v[count].id        "             "
	v[count][1]        "             "
	...                "             "
	v[count][numDims]  "             "
}`

const schema2 =
`Schema Stream
{
	count              4 bytes                  uint

	a[1].type          4 bytes                  uint
	a[1].numDims       4 bytes                  uint
	a[1].blobSize      4 bytes                  uint
	...                "                        "
	a[count].type      "                        "
	a[count].numDims   "                        "
	a[count].blobSiz   "                        "

	a[1].blob          a[1].blobSize bytes      raw bytes
	...                ...                      ...
	a[count].blob      a[count].blobSize bytes  raw bytes
}`

const schema3 =
`Command (uint)
{
	ping    0
	info    1
	search  2
	train   3
	save    4
	exit    5
}

Command Stream
{
	cmd  4 bytes  Command
	id   4 bytes  uint
}

Comand Return Stream
{
	cmd  4 bytes  Command
	id   4 bytes  uint
}`

const schema4 =
`Search Stream
{
	<Command Stream>    8 bytes
	k                   4 bytes   uint
	<Vector Stream>   > 17 bytes
}

Train Stream
{
	<Command Stream>    8 bytes
	<Vector Stram>    > 17 bytes
}`

const schema5 =
`DistanceType (uint)
{
	manhattan   0
	euclidean   1
	dotproduct  2
	cosine      3
}

Ping Return Stream
{
	<Command Return Stream>  8 bytes
	epoch                    8 bytes  uint
}

Info Return Stream
{
	<Command Return Stream>    8 bytes
	idSize                     4 bytes  uint
	numDims                    4 bytes  uint
	dataType                   1 byte   DataType
	distanceType               1 byte   DistanceType
	<Schema Stream>          > 4 bytes
}

Search Return Stream
{
	<Command Return Stream>    8 bytes
	count                      8 bytes   uint
	<Vector Stream>[1]       > 17 bytes
	...                        "
	<Vector Stream>[count]     "
}`

export default function DocsPage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl lg:text-5xl">
            Documentation
          </h1>
          {/*<p className="text-xl text-muted-foreground">
            Learn how to use Aspects in your applications.
          </p>*/}
        </div>
      </div>

<p className="text-muted-foreground">
Check out all source code:
</p>

<div className="text-sm font-mono bg-muted px-2 py-1 rounded">
git clone https://github.com/xillio/aspects.dev.git && cd aspects.dev
</div>

<p className="text-muted-foreground">
The repository comes with a Makefile, run `make` without a target to view all possible build targets.
This Makefile is able to produce the `aspects.dev.a` static library and `aspects.cli` CLI tool.
To build the library, `gcc` and `make` need to be installed.
</p>

<p className="text-muted-foreground">
The CLI tool can be executed as follows to show the help dialogue:
</p>

<div className="text-sm font-mono bg-muted px-2 py-1 rounded">
./bin/aspects.cli -?
</div>

<p className="text-muted-foreground">
It has a set of functions to either create or access an aspects.dev vector index.
Whenever input or output is streamed over stdin/stdout, please refer to the [streaming section](#streaming-for-cli).
</p>
<ul className="list-disc space-y-2 pl-6">
<li>
- `--search`: Open an existing index, input a vector stream through stdin and output a search return stream through stdout.
   The number of neighours can be given through `--neighbours` (or just `-k`).
</li>
<li>
- `--train`: Open an existing index, input a vector stream through stdin.
</li>
<li>
- `--init`: Create a new index, optionally input a schema stream through stdin by turning on `--schema` (or just `-s`).
</li>
<li>
- `--host`: Open an existing index, perform any command through stdin/stdout.
</li>
</ul>

<p className="text-muted-foreground">
All other arguments to the CLI tool are to give input to any of the functions listed above.
The `--input` option is to give the directory the index lives in, used for the `search`, `train` and `host` functions.
The `--output` option is to give the output directory for a new index, used for the `init` functions.
All other options are to give additional initialization parameters when using the `init` functions.
</p>

<p className="text-muted-foreground">
Besides the static library and CLI tool, development kits for other languages are provided:
</p>
<ul className="list-disc space-y-2 pl-6">
<li>
- JavaScript/TypeScript via Node.js: see `node/`.
</li>
</ul>
<p className="text-muted-foreground">
A convenience `Dockerfile` and `compose.yaml` are included in the root of this repository.
Run `docker compose up -d` to automatically build an image containing the CLI tool and node server in one.
</p>

<p className="text-muted-foreground">
Packed information is communicated to the CLI tool through the standard input/output streams (stdin and stdout).
This is used to stream vectors, schemas and commands.
Below are all streaming structures defined, all data types are little endian.

Vectors are streamed together, with a single header for multiple vectors.
A vector is composed of an id and a number of dimensions.
The byte size of each component is defined by its header.
Each dimensions byte size is defined by `dataType`, which is defined as an enumeration.
</p>

<pre className={cn("p-4 rounded-md bg-muted overflow-auto text-sm",{"bg-zinc-950 text-zinc-50 dark:bg-zinc-900": true})}>
{schema1}
</pre>

<p className="text-muted-foreground">
Schemas are streamed individually.
A schema is composed of a number of aspects.
Each aspect is composed of a header and an arbitrary blob of data.
The header contains a type, the number of dimensions of the aspect and the blob size.
All headers are streamed first, then all blobs.
</p>

<pre className={cn("p-4 rounded-md bg-muted overflow-auto text-sm",{"bg-zinc-950 text-zinc-50 dark:bg-zinc-900": true})}>
{schema2}
</pre>

<p className="text-muted-foreground">
Commands are continuously streamed back to back when the CLI is in host mode.
All commands have at least the command type as enumeration and an id.
The id is simply returned in the return stream so the caller can identify.
</p>

<pre className={cn("p-4 rounded-md bg-muted overflow-auto text-sm",{"bg-zinc-950 text-zinc-50 dark:bg-zinc-900": true})}>
{schema3}
</pre>

<p className="text-muted-foreground">
The search and train commands have their own streaming structure.
Both the search and train command take the input vectors as a stream.
The search command also takes `k`, the number of neighbours to find.
</p>

<pre className={cn("p-4 rounded-md bg-muted overflow-auto text-sm",{"bg-zinc-950 text-zinc-50 dark:bg-zinc-900": true})}>
{schema4}
</pre>

<p className="text-muted-foreground">
For the train, save and exit commands the response is a normal command return structure.
The ping, info and search commands have their own return structures.
The ping command returns the time since epoch, in milliseconds.
The info command returns idSize, numDims, dataType, distanceType and schema of the index.
</p>
<p className="text-muted-foreground">
The search command returns a number of vector streams.
Each of those streams corresponds to the found neighbours for each of the input vectors.
Each returned vector onlhy has 1 dimension; the distance to the input vector.
The actual found vectors dimensions are not returned, only its id and the distance.
</p>

<pre className={cn("p-4 rounded-md bg-muted overflow-auto text-sm",{"bg-zinc-950 text-zinc-50 dark:bg-zinc-900": true})}>
{schema5}
</pre>

      {/*<div className="grid gap-6 pt-10 md:grid-cols-2">
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Getting Started
            </CardTitle>
            <CardDescription>
              Learn the basics of Aspects and how to set up your first project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <Link
                  href="/docs/getting-started"
                  className="font-medium hover:underline"
                >
                  Introduction to Aspects
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/installation"
                  className="font-medium hover:underline"
                >
                  Installation Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/concepts/vector-embeddings"
                  className="font-medium hover:underline"
                >
                  Understanding Vector Embeddings
                </Link>
              </li>
            </ul>
            <div className="pt-4">
              <Link
                href="/docs/getting-started"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              API Reference
            </CardTitle>
            <CardDescription>
              Comprehensive API documentation for all client libraries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <Link
                  href="/api-reference/client"
                  className="font-medium hover:underline"
                >
                  Client API
                </Link>
              </li>
              <li>
                <Link
                  href="/api-reference/query"
                  className="font-medium hover:underline"
                >
                  Query API
                </Link>
              </li>
              <li>
                <Link
                  href="/api-reference/management"
                  className="font-medium hover:underline"
                >
                  Management API
                </Link>
              </li>
            </ul>
            <div className="pt-4">
              <Link
                href="/api-reference"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View API reference <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Benchmarks
            </CardTitle>
            <CardDescription>
              Performance comparisons and benchmarking methodology.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <Link
                  href="/benchmarks"
                  className="font-medium hover:underline"
                >
                  Performance Metrics
                </Link>
              </li>
              <li>
                <Link
                  href="/benchmarks/methodology"
                  className="font-medium hover:underline"
                >
                  Benchmarking Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/benchmarks/comparisons"
                  className="font-medium hover:underline"
                >
                  Competitor Comparisons
                </Link>
              </li>
            </ul>
            <div className="pt-4">
              <Link
                href="/benchmarks"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all benchmarks <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Deployment
            </CardTitle>
            <CardDescription>
              Learn how to deploy Aspects in production environments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <Link
                  href="/docs/deployment/docker"
                  className="font-medium hover:underline"
                >
                  Docker Deployment
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/deployment/kubernetes"
                  className="font-medium hover:underline"
                >
                  Kubernetes Setup
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/deployment/cloud-providers"
                  className="font-medium hover:underline"
                >
                  Cloud Provider Options
                </Link>
              </li>
            </ul>
            <div className="pt-4">
              <Link
                href="/docs/deployment"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Deployment guides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Boxes className="h-5 w-5" />
              Guides & Tutorials
            </CardTitle>
            <CardDescription>
              Step-by-step guides for common use cases and advanced scenarios.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-medium">Applications</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <Link
                      href="/docs/guides/rag-applications"
                      className="font-medium hover:underline"
                    >
                      Building RAG Applications
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/guides/semantic-search"
                      className="font-medium hover:underline"
                    >
                      Implementing Semantic Search
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-medium">Advanced Usage</h3>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <Link
                      href="/docs/guides/performance-tuning"
                      className="font-medium hover:underline"
                    >
                      Performance Tuning
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/guides/security-best-practices"
                      className="font-medium hover:underline"
                    >
                      Security Best Practices
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-4">
              <Link
                href="/docs/guides"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all guides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>*/}

    </div>
  );
}
