# Documentation

## Getting Started

Check out all source code:

```bash
git clone https://github.com/xillio/aspects.dev.git && cd aspects.dev
```

The repository comes with a Makefile. Run `make` without a target to view all possible build targets.

This Makefile can produce:

- `aspects.dev.a`: the static library
- `aspects.cli`: the CLI tool

To build the library, ensure `gcc` and `make` are installed.

To show the CLI tool help dialogue:

```bash
./bin/aspects.cli -?
```

The CLI provides a set of functions to create or access an `aspects.dev` vector index.
Whenever input or output is streamed over `stdin`/`stdout`, refer to the [Streaming section](#streaming-structures).

## CLI Options

- `--search`: Open an existing index, input a vector stream through stdin and output a search return stream through stdout.
  Use `--neighbours` or `-k` to set number of neighbors.
- `--train`: Open an existing index and input a vector stream through stdin.
- `--init`: Create a new index. Use `--schema` or `-s` to input a schema stream through stdin.
- `--host`: Open an existing index and perform any command through stdin/stdout.

### Common CLI Options

- `--input`: Directory of the existing index (for `search`, `train`, and `host`)
- `--output`: Output directory for a new index (used with `init`)
- Additional options configure initialization parameters for the `init` function.

## SDKs

- JavaScript/TypeScript via Node.js: see the `node/` directory.

## Docker

A convenience `Dockerfile` and `compose.yaml` are included in the repository root.
To build and run:

```bash
docker compose up -d
```

This will build an image containing both the CLI tool and the Node.js server.

---

## Streaming Structures

Packed information is communicated to the CLI tool via `stdin`/`stdout`.
This includes vectors, schemas, and commands. All data is **little-endian**.

### Vector Stream

Vectors are streamed together, with a single header for multiple vectors.
Each vector includes an ID and a number of dimensions.
The byte size of each component is defined by the header.

```text
DataType (uint)
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
	v[1][1]            d bytes       dataType (`d` is determined by dataType)
	...
	v[1][numDims]      d bytes       dataType

	v[2].id            "             "
	...
	v[count][numDims]  "             "
}
```

### Schema Stream

Schemas are streamed individually.
Each schema includes a number of aspects, each with a header and a blob of data.
All headers are streamed first, followed by all blobs.

```text
Schema Stream
{
	count              4 bytes                  uint

	a[1].type          4 bytes                  uint
	a[1].numDims       4 bytes                  uint
	a[1].blobSize      4 bytes                  uint
	...
	a[count].blobSize  "                        "

	a[1].blob          a[1].blobSize bytes      raw bytes
	...
	a[count].blob      a[count].blobSize bytes  raw bytes
}
```

### Command Stream

Used continuously when the CLI is in host mode.
Each command includes an ID for response tracking.

```text
Command (uint)
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

Command Return Stream
{
	cmd  4 bytes  Command
	id   4 bytes  uint
}
```

### Search & Train Stream

Both search and train commands accept input vectors via stream.
Search additionally requires `k` (number of neighbors).

```text
Search Stream
{
	<Command Stream>    8 bytes
	k                   4 bytes   uint
	<Vector Stream>   > 17 bytes
}

Train Stream
{
	<Command Stream>    8 bytes
	<Vector Stream>   > 17 bytes
}
```

### Return Streams

Different commands have specific return formats:

```text
DistanceType (uint)
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
	...
	<Vector Stream>[count]     "
}
```

**Note:**
Returned vectors from search only include:

- `id`
- 1 dimension representing the **distance** to the input vector
  The full dimensions of the found vectors are not returned.
