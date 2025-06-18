import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import markdownContent from '../content/docs.md?raw'

export default function Docs() {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    setMarkdown(markdownContent)
  }, [])

  return (
    <section className="px-6 py-10">
      <div className="max-w-4xl mx-auto prose dark:prose-invert prose-headings:font-semibold prose-pre:bg-zinc-950 prose-pre:text-white prose-code:text-pink-500">
        <ReactMarkdown
          children={markdown}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        />
      </div>
    </section>
  )
}
