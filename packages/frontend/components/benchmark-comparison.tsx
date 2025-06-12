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
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample benchmark data
const queryPerformanceData = [
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

const resourceUsageData = [
  {
    name: "CPU (cores)",
    Aspects: 2,
    Competitor1: 4.8,
    Competitor2: 3.7,
    Competitor3: 5.2,
  },
  {
    name: "Memory (GB)",
    Aspects: 3.2,
    Competitor1: 7.5,
    Competitor2: 6.1,
    Competitor3: 8.9,
  },
  {
    name: "Storage (GB)",
    Aspects: 8.5,
    Competitor1: 15.7,
    Competitor2: 12.3,
    Competitor3: 18.2,
  },
  {
    name: "Energy (kWh)",
    Aspects: 1.2,
    Competitor1: 2.8,
    Competitor2: 2.3,
    Competitor3: 3.5,
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
            {entry.name.includes("Energy") ? " kWh" : 
              entry.name.includes("CPU") ? " cores" : 
              entry.name.includes("Memory") || entry.name.includes("Storage") ? " GB" : 
              entry.payload.name.includes("Vectors") ? " ms" : ""}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export function BenchmarkComparison() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Performance Comparison</CardTitle>
        <CardDescription>
          Benchmark results comparing Aspects with other leading vector databases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="query-time" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="query-time">Query Response Time</TabsTrigger>
            <TabsTrigger value="resource-usage">Resource Usage</TabsTrigger>
          </TabsList>
          <TabsContent value="query-time" className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={queryPerformanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Query Time (ms)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="Aspects" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="Competitor1" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="Competitor2" fill="hsl(var(--chart-3))" />
                  <Bar dataKey="Competitor3" fill="hsl(var(--chart-4))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground">
              Lower is better. Measurements performed on AWS r6g.8xlarge instances, average of 1000 queries.
            </p>
          </TabsContent>
          <TabsContent value="resource-usage" className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={resourceUsageData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="Aspects" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="Competitor1" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="Competitor2" fill="hsl(var(--chart-3))" />
                  <Bar dataKey="Competitor3" fill="hsl(var(--chart-4))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground">
              Lower is better. Measurements for 1M vector dataset with 100 dimensions.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}