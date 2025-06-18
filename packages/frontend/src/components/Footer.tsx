import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 py-4 mt-12">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <Link to="/privacy" className="hover:underline mx-2">
          Privacy
        </Link>
        <Link to="/terms" className="hover:underline mx-2">
          Terms
        </Link>
      </div>
    </footer>
  )
}
