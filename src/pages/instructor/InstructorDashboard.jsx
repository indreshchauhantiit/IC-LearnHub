import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ArrowLeft } from "lucide-react";
import {
  BookOpen,
  Users,
  GraduationCap,
  PlusCircle,
  Video,
  ArrowRight,
  BarChart3,
  Clock,
  CirclePlay,
  FileText,
  LogOut,
} from "lucide-react";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Demo statistics
  const stats = [
    {
      title: "Total Courses",
      value: "04",
      description: "Courses available to manage",
      icon: <BookOpen size={24} />,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Total Students",
      value: "128",
      description: "Across all your courses",
      icon: <Users size={24} />,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Total Enrollments",
      value: "246",
      description: "Course enrollments",
      icon: <GraduationCap size={24} />,
      color: "bg-sky-50 text-sky-600",
    },
    {
      title: "Learning Hours",
      value: "356",
      description: "Hours of learning content",
      icon: <Clock size={24} />,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  // Dashboard shortcuts
  const quickActions = [
    {
      title: "Create a Course",
      description: "Build a new course for your students.",
      icon: <PlusCircle size={23} />,
      to: "/instructor/courses/manage",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Manage Courses",
      description: "View and manage your created courses.",
      icon: <BookOpen size={23} />,
      to: "/instructor/courses",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Manage Lectures",
      description: "Add and organize course lectures.",
      icon: <Video size={23} />,
      to: "/instructor/courses",
      color: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Welcome Banner */}
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-900 to-indigo-700 p-6 text-white shadow-lg sm:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-indigo-100">
                <GraduationCap size={16} />
                Instructor Workspace
              </span>

              <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
                Welcome, Instructor!
              </h1>

              <p className="mt-3 max-w-xl leading-7 text-indigo-100">
                Manage your courses, organize lectures, and create a better
                learning experience for your students.
              </p>

              {/* Opens the course list */}
              <Link
                to="/instructor/courses"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50"
              >
                Manage My Courses
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="mb-5">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2
                  text-sm font-semibold text-slate-600 transition
                  hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <ArrowLeft size={18} />
                  Back to Home
                </Link>
              </div>

            {/* Logout Button */}
            <div className="flex shrink-0 items-center gap-4">
              <div className="hidden h-28 w-28 items-center justify-center rounded-3xl bg-white/10 lg:flex">
                <GraduationCap size={64} strokeWidth={1.3} />
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-red-600 shadow-sm transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-800"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">
              Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A quick look at your teaching activity.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  {stat.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">
              Quick Actions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Shortcuts to your main teaching tools.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.to}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${action.color}`}
                >
                  {action.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-900">
                    {action.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {action.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
                    Open
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Course Management Panel */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <BarChart3 size={23} />
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  Course Management
                </h2>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                View your created courses, update course details, and organize
                your learning materials.
              </p>
            </div>

            {/* Opens the course list, not the creation form */}
            <Link
              to="/instructor/courses"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              View Courses
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <FileText size={20} className="mt-0.5 text-indigo-600" />

              <div>
                <h3 className="font-semibold text-slate-800">
                  Course Content
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Organize course information and learning materials.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CirclePlay size={20} className="mt-0.5 text-indigo-600" />

              <div>
                <h3 className="font-semibold text-slate-800">
                  Lecture Library
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Access your lecture management workflow.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InstructorDashboard;
