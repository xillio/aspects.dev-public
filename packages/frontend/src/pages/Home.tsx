import { Link } from "react-router-dom";
import CodeTabs from "../components/CodeTabs";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-6">
      {/* Left: Text content */}
      <div className="md:w-2/5 pt-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white mb-4">
          High-Performance Vector Index
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl">
          aspects.dev is a specialized vector index for efficient metadata
          and text embedding search.
        </p>
        <div className="flex gap-4">
          <Link
            to="/get-started"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Get Started
          </Link>
          <Link
            to="/docs"
            className="border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold py-2 px-4 rounded-md"
          >
            Documentation
          </Link>
        </div>
      </div>

      {/* Right: Code widget */}
      <div className="md:w-3/5">
        <CodeTabs />
      </div>
    </section>
  );
}
