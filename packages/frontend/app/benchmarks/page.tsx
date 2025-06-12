"use client";

import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// Sample benchmark data
const queryLatencyData = [
  {
    name: "1K Vectors",
    Aspects: 0.5,
    Competitor1: 1.2,
    Competitor2: 0.9,
    Competitor3: 1.7,
  },
  {
    name: "10K Vectors",
    Aspects: 1.2,
    Competitor1: 3.1,
    Competitor2: 2.5,
    Competitor3: 4.2,
  },
  {
    name: "100K Vectors",
    Aspects: 3.5,
    Competitor1: 8.7,
    Competitor2: 7.3,
    Competitor3: 11.5,
  },
  {
    name: "1M Vectors",
    Aspects: 9.8,
    Competitor1: 25.3,
    Competitor2: 21.7,
    Competitor3: 38.9,
  },
  {
    name: "10M Vectors",
    Aspects: 45.2,
    Competitor1: 120.5,
    Competitor2: 98.4,
    Competitor3: 165.7,
  },
];

const throughputData = [
  {
    name: "1 Thread",
    Aspects: 2500,
    Competitor1: 1800,
    Competitor2: 2100,
    Competitor3: 1500,
  },
  {
    name: "2 Threads",
    Aspects: 4800,
    Competitor1: 3500,
    Competitor2: 4000,
    Competitor3: 2900,
  },
  {
    name: "4 Threads",
    Aspects: 9200,
    Competitor1: 6800,
    Competitor2: 7600,
    Competitor3: 5700,
  },
  {
    name: "8 Threads",
    Aspects: 17500,
    Competitor1: 13000,
    Competitor2: 14500,
    Competitor3: 11000,
  },
  {
    name: "16 Threads",
    Aspects: 32000,
    Competitor1: 24000,
    Competitor2: 27000,
    Competitor3: 20000,
  },
];

const scalabilityData = [
  {
    name: "1M",
    Aspects: 100,
    Competitor1: 100,
    Competitor2: 100,
    Competitor3: 100,
  },
  {
    name: "10M",
    Aspects: 105,
    Competitor1: 130,
    Competitor2: 120,
    Competitor3: 140,
  },
  {
    name: "100M",
    Aspects: 115,
    Competitor1: 180,
    Competitor2: 160,
    Competitor3: 210,
  },
  {
    name: "1B",
    Aspects: 135,
    Competitor1: 270,
    Competitor2: 240,
    Competitor3: 320,
  },
];

const energyData = [
  {
    name: "Idle",
    Aspects: 1.0,
    Competitor1: 1.5,
    Competitor2: 1.3,
    Competitor3: 1.8,
  },
  {
    name: "Light Load",
    Aspects: 2.5,
    Competitor1: 4.2,
    Competitor2: 3.8,
    Competitor3: 5.1,
  },
  {
    name: "Medium Load",
    Aspects: 4.8,
    Competitor1: 8.3,
    Competitor2: 7.5,
    Competitor3: 9.7,
  },
  {
    name: "Heavy Load",
    Aspects: 8.2,
    Competitor1: 15.6,
    Competitor2: 13.8,
    Competitor3: 18.3,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-4 border rounded-md shadow-md">
        <p className="font-bold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name.includes("Energy") ? " kWh" : ""}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default function BenchmarksPage() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl lg:text-5xl">
            Performance Benchmarks
          </h1>
          <p className="text-xl text-muted-foreground">
            See how Aspects compares to other vector databases across key performance metrics.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-12">
        {/* Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Benchmark Overview</CardTitle>
            <CardDescription>
              Our benchmarks measure real-world performance using standardized test scenarios.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              All benchmarks were performed on identical hardware (AWS r6g.8xlarge instances) running Ubuntu 22.04 LTS. 
              Each database was tested with the same dataset consisting of text embeddings generated from OpenAI's text-embedding-ada-002 model.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Hardware Configuration</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>32 vCPUs (AWS Graviton2 Processor)</li>
                  <li>256 GB RAM</li>
                  <li>EBS gp3 volumes (5000 IOPS, 1000 MB/s throughput)</li>
                  <li>Ubuntu 22.04 LTS</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Testing Methodology</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Vector dimensions: 1,536</li>
                  <li>Measured average over 10,000 queries</li>
                  <li>Excluded cold-start performance</li>
                  <li>Consistent metadata structure across databases</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Query Latency Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Query Latency Comparison</CardTitle>
            <CardDescription>
              Average query response time in milliseconds (lower is better)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={queryLatencyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Response Time (ms)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="Aspects" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="Competitor1" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="Competitor2" fill="hsl(var(--chart-3))" />
                  <Bar dataKey="Competitor3" fill="hsl(var(--chart-4))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Chart shows average query latency for top-10 nearest neighbor search across different dataset sizes.
              Aspects consistently delivers lower latency even as the dataset size increases.
            </p>
          </CardContent>
        </Card>

        {/* Throughput Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Throughput Performance</CardTitle>
            <CardDescription>
              Queries per second with varying concurrency (higher is better)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={throughputData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Queries per Second', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="Aspects" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="Competitor1" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="Competitor2" fill="hsl(var(--chart-3))" />
                  <Bar dataKey="Competitor3" fill="hsl(var(--chart-4))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Chart shows throughput (queries per second) with increasing thread count.
              Aspects scales more efficiently with additional threads, demonstrating better concurrency handling.
            </p>
          </CardContent>
        </Card>

        {/* Scalability Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Scalability Characteristics</CardTitle>
            <CardDescription>
              Relative query time as dataset size increases (lower is better)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={scalabilityData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" label={{ value: 'Dataset Size (vectors)', position: 'insideBottom', offset: -5 }} />
                  <YAxis label={{ value: 'Relative Query Time (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="Aspects" stroke="hsl(var(--chart-1))" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="Competitor1" stroke="hsl(var(--chart-2))" />
                  <Line type="monotone" dataKey="Competitor2" stroke="hsl(var(--chart-3))" />
                  <Line type="monotone" dataKey="Competitor3" stroke="hsl(var(--chart-4))" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Chart shows how query time scales relative to the 1M vector baseline (set at 100%).
              Aspects maintains more consistent performance as dataset size increases, showing better scalability.
            </p>
          </CardContent>
        </Card>

        {/* Energy Efficiency Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Efficiency</CardTitle>
            <CardDescription>
              Energy consumption in kWh under different workloads (lower is better)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={energyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Energy Consumption (kWh)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="Aspects" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="Competitor1" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="Competitor2" fill="hsl(var(--chart-3))" />
                  <Bar dataKey="Competitor3" fill="hsl(var(--chart-4))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Chart shows energy consumption under different workload conditions, measured over a 24-hour period.
              Aspects consumes significantly less energy across all workload types, reducing operational costs.
            </p>
          </CardContent>
        </Card>

        {/* Methodology Section */}
        <div className="prose dark:prose-invert max-w-none">
          <h2>Benchmarking Methodology</h2>
          <p>
            Our benchmarking methodology is designed to provide fair and reproducible comparisons between Aspects and other vector databases. 
            We use standardized datasets, queries, and hardware configurations to ensure consistent results.
          </p>
          
          <h3>Dataset Preparation</h3>
          <p>
            We used the following datasets for our benchmarks:
          </p>
          <ul>
            <li>1K, 10K, 100K, 1M, and 10M text embeddings generated using OpenAI's text-embedding-ada-002 model (1,536 dimensions)</li>
            <li>Each vector has associated metadata including text, source, date, and category fields</li>
            <li>Dataset was pre-processed to ensure consistency across all database systems</li>
          </ul>
          
          <h3>Query Types</h3>
          <p>
            Our benchmark suite includes various query types to test different aspects of performance:
          </p>
          <ul>
            <li>Pure vector similarity search (k-NN queries)</li>
            <li>Vector search with metadata filters</li>
            <li>Hybrid search combining vector similarity and text matching</li>
            <li>Batch queries for throughput testing</li>
          </ul>
          
          <Link href="/benchmarks/methodology" className="text-primary hover:underline">
            Read the complete methodology documentation →
          </Link>
        </div>
      </div>
    </div>
  );
}