"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface DocLink {
  title: string;
  href: string;
  items?: DocLink[];
}

const docsConfig: DocLink[] = [
  {
    title: "Getting Started",
    href: "/docs/getting-started",
  },
  {
    title: "Installation",
    href: "/docs/installation",
  },
  {
    title: "Concepts",
    href: "/docs/concepts",
    items: [
      {
        title: "Vector Embeddings",
        href: "/docs/concepts/vector-embeddings",
      },
      {
        title: "Storage Models",
        href: "/docs/concepts/storage-models",
      },
      {
        title: "Embedding Models",
        href: "/docs/concepts/embedding-models",
      },
      {
        title: "Similarity Metrics",
        href: "/docs/concepts/similarity-metrics",
      },
    ],
  },
  {
    title: "Features",
    href: "/docs/features",
    items: [
      {
        title: "Vector Search",
        href: "/docs/features/vector-search",
      },
      {
        title: "Metadata Filtering",
        href: "/docs/features/metadata-filtering",
      },
      {
        title: "Hybrid Search",
        href: "/docs/features/hybrid-search",
      },
      {
        title: "Multi-tenancy",
        href: "/docs/features/multi-tenancy",
      },
    ],
  },
  {
    title: "Deployment",
    href: "/docs/deployment",
    items: [
      {
        title: "Docker",
        href: "/docs/deployment/docker",
      },
      {
        title: "Kubernetes",
        href: "/docs/deployment/kubernetes",
      },
      {
        title: "Cloud Providers",
        href: "/docs/deployment/cloud-providers",
      },
    ],
  },
  {
    title: "Integrations",
    href: "/docs/integrations",
    items: [
      {
        title: "LangChain",
        href: "/docs/integrations/langchain",
      },
      {
        title: "LlamaIndex",
        href: "/docs/integrations/llamaindex",
      },
      {
        title: "Hugging Face",
        href: "/docs/integrations/huggingface",
      },
    ],
  },
  {
    title: "Guides",
    href: "/docs/guides",
    items: [
      {
        title: "RAG Applications",
        href: "/docs/guides/rag-applications",
      },
      {
        title: "Performance Tuning",
        href: "/docs/guides/performance-tuning",
      },
      {
        title: "Security Best Practices",
        href: "/docs/guides/security-best-practices",
      },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <div className="pb-4">
        <Link
          href="/docs"
          className="inline-flex items-center gap-1 text-lg font-semibold"
        >
          Documentation
        </Link>
      </div>
      <Accordion type="multiple" defaultValue={["concepts", "features", "deployment", "integrations", "guides"]}>
        {docsConfig.map((section) => {
          if (!section.items) {
            return (
              <div key={section.href} className="pb-1">
                <Link
                  href={section.href}
                  className={cn(
                    "block py-1 text-sm font-medium hover:text-primary",
                    pathname === section.href ? "text-primary font-semibold" : "text-muted-foreground"
                  )}
                >
                  {section.title}
                </Link>
              </div>
            );
          }

          return (
            <AccordionItem key={section.href} value={section.title.toLowerCase()}>
              <AccordionTrigger className="py-1 text-sm font-medium hover:text-primary">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-1 pl-4">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "py-1 text-sm hover:text-primary",
                        pathname === item.href ? "text-primary font-medium" : "text-muted-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}