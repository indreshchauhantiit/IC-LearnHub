
import { Link } from 'react-router-dom';

function PlaceholderPage({ title }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
      <h1 className="text-3xl font-bold text-indigo-600">
        {title}
      </h1>

      <p className="mt-3 text-slate-600">
        This page is under development.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-white hover:bg-indigo-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default PlaceholderPage;