import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Database, Zap, Shield, Server, BarChart3 } from "lucide-react";
import { BenchmarkComparison } from "@/components/benchmark-comparison";
import { FeatureCard } from "@/components/feature-card";
import { CodeExampleTabs } from "@/components/code-example-tabs";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-36">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  High-Performance Vector Database
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Aspects is a highly optimized vector database for efficient metadata and text embedding storage.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/docs/getting-started">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Get Started
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button size="lg" variant="outline">
                    Documentation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[1000px] overflow-hidden rounded-lg border bg-background p-2 shadow-xl">
                <CodeExampleTabs />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/*<section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Key Features
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Designed for performance, efficiency, and developer experience
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Zap className="h-10 w-10" />}
              title="High Performance"
              description="Industry-leading query speeds with optimized indexing for vector search operations."
            />
            <FeatureCard
              icon={<Server className="h-10 w-10" />}
              title="Energy Efficient"
              description="Reduced computational requirements leading to lower energy consumption and costs."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10" />}
              title="Enterprise Ready"
              description="Built-in security features and compliance with enterprise requirements."
            />
            <FeatureCard
              icon={<Database className="h-10 w-10" />}
              title="Scalable Storage"
              description="Efficiently store and query billions of vectors with minimal resource usage."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10" />}
              title="Metadata Optimized"
              description="First-class support for structured metadata alongside vector embeddings."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10" />}
              title="Simple API"
              description="Intuitive API design that makes vector operations straightforward."
            />
          </div>
        </div>
      </section>*/}

      {/* Performance Benchmarks Section */}
      {/*<section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Benchmark Comparisons
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See how Aspects outperforms other vector databases in real-world scenarios
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-4xl py-12">
            <BenchmarkComparison />
          </div>
          <div className="flex justify-center">
            <Link href="/benchmarks">
              <Button size="lg" variant="outline">
                View All Benchmarks
              </Button>
            </Link>
          </div>
        </div>
      </section>*/}

      {/* CTA Section */}
      {/*<section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start using Aspects in your project today and experience the performance difference.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/docs/getting-started">
                <Button size="lg" variant="secondary">
                  Get Started
                </Button>
              </Link>
              <Link href="https://github.com/aspects/aspects">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>*/}
    </div>
  );
}
