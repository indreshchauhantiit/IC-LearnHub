
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserRound,
  Mail,
  ShieldCheck,
  Save,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const StudentProfile = () => {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }

    updateUser({ name: trimmedName });
    setName(trimmedName);
    setMessage("Profile updated successfully!");
  };

  const initials = (user?.name || "Student")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/student/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            My Profile
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your personal information and account details.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-700">
              {initials}
            </div>

            <h2 className="mt-4 break-words text-xl font-bold text-slate-900">
              {user?.name || "Student"}
            </h2>

            <p className="mt-1 break-all text-sm text-slate-500">
              {user?.email || "No email available"}
            </p>

            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold capitalize text-emerald-700">
              <ShieldCheck size={16} />
              {user?.role || "Student"} Account
            </span>

            <div className="mt-6 border-t border-slate-100 pt-5 text-left">
              <div className="flex items-center gap-3 text-slate-600">
                <GraduationCap
                  size={20}
                  className="text-indigo-600"
                />
                <span className="text-sm">IC-Learn-Hub Student</span>
              </div>
            </div>
          </aside>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Personal Information
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Update your name below. Your registered email is read-only.
            </p>

            {message && (
              <div
                role="status"
                className="mt-5 rounded-lg bg-emerald-50 p-3 text-sm font-medium text-emerald-700"
              >
                {message}
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="mt-5 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="profileName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="profileName"
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setMessage("");
                      setError("");
                    }}
                    maxLength={80}
                    required
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profileEmail"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="profileEmail"
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-500 outline-none"
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Email change is disabled to keep your enrolled-course
                  records linked to your account.
                </p>
              </div>

              <div>
                <label
                  htmlFor="profileRole"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Account Role
                </label>

                <input
                  id="profileRole"
                  type="text"
                  value={user?.role || "student"}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 capitalize text-slate-500"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 sm:w-auto"
              >
                <Save size={18} />
                Save Changes
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
