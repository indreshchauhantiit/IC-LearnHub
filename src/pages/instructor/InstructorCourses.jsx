
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Plus,
  Search,
  Trash2,
  Clock,
  IndianRupee,
  Users,
  GraduationCap,
  BookOpenCheck,
  CircleAlert,
} from "lucide-react";

const STORAGE_KEY = "lms-created-courses";

function InstructorCourses() {
  const location = useLocation();

  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(
    location.state?.message || ""
  );
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      const storedCourses = localStorage.getItem(STORAGE_KEY);
      const parsedCourses = storedCourses
        ? JSON.parse(storedCourses)
        : [];

      if (!Array.isArray(parsedCourses)) {
        throw new Error("Course data must be an array.");
      }

      setCourses(parsedCourses);
    } catch (error) {
      console.error("Unable to load courses:", error);
      setStorageError(
        "Courses could not be loaded. Your browser storage may contain invalid data."
      );
    }
  }, []);

  const filteredCourses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return courses;

    return courses.filter((course) =>
      [
        course.title,
        course.subtitle,
        course.category,
        course.instructor,
        course.status,
      ].some((value) =>
        String(value || "").toLowerCase().includes(query)
      )
    );
  }, [courses, searchTerm]);

  const publishedCount = courses.filter(
    (course) => course.status === "published"
  ).length;

  const totalStudents = courses.reduce(
    (total, course) => total + (Number(course.students) || 0),
    0
  );

  const handleDelete = (course) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${course.title}"?`
    );

    if (!confirmed) return;

    try {
      const updatedCourses = courses.filter(
        (item) => item.id !== course.id
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedCourses)
      );

      setCourses(updatedCourses);
      setMessage("Course deleted successfully!");
      setStorageError("");
    } catch (error) {
      console.error("Unable to delete course:", error);
      setStorageError(
        "Unable to delete this course. Please check your browser storage."
      );
    }
  };

  const formatPrice = (price) =>
    `₹${(Number(price) || 0).toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/instructor/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                <BookOpen size={26} />
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Manage Courses
              </h1>
            </div>

            <p className="text-slate-500">
              Create, review and manage the courses you teach.
            </p>
          </div>

          <Link
            to="/instructor/courses/manage"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Plus size={19} />
            Create Course
          </Link>
        </div>

        {message && (
          <div
            role="status"
            className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            <span>{message}</span>

            <button
              type="button"
              onClick={() => setMessage("")}
              className="font-semibold hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {storageError && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <CircleAlert size={20} className="mt-0.5 shrink-0" />
            <span>{storageError}</span>
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Courses
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {courses.length}
                </p>
              </div>

              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <BookOpen size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Published Courses
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {publishedCount}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <BookOpenCheck size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Enrollments
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {totalStudents}
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Users size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by course title, category or instructor..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div className="mb-4 mt-8 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-900">
            Your Courses
          </h2>

          <span className="text-sm text-slate-500">
            {filteredCourses.length}{" "}
            {filteredCourses.length === 1 ? "course" : "courses"}
          </span>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <GraduationCap size={32} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              {searchTerm
                ? "No matching courses found"
                : "No courses created yet"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {searchTerm
                ? "Try another search term or clear your search."
                : "Create your first course to start building your teaching library."}
            </p>

            {searchTerm ? (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-5 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Clear Search
              </button>
            ) : (
              <Link
                to="/instructor/courses/manage"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                <Plus size={18} />
                Create Your First Course
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <article
                key={course.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-48 bg-slate-100">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title || "Course thumbnail"}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}

                  <div className="absolute left-3 top-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        course.status === "published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {course.status || "draft"}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {course.category || "Uncategorized"}
                    </span>

                    <span className="text-xs text-slate-500">
                      {course.level || "All Levels"}
                    </span>
                  </div>

                  <h3 className="mt-4 line-clamp-2 text-lg font-bold text-slate-900">
                    {course.title || "Untitled Course"}
                  </h3>

                  {course.subtitle && (
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                      {course.subtitle}
                    </p>
                  )}

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {course.description || "No description provided."}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <GraduationCap size={15} />
                      {course.instructor || "Instructor"}
                    </span>

                    <span className="inline-flex items-center gap-1">
                      <Clock size={15} />
                      {course.duration || "Duration not set"}
                    </span>

                    <span className="inline-flex items-center gap-1">
                      <Users size={15} />
                      {Number(course.students) || 0} students
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="inline-flex items-center gap-1 text-lg font-bold text-slate-900">
                        <IndianRupee size={17} />
                        {(Number(course.price) || 0).toLocaleString("en-IN")}
                      </p>

                      {Number(course.originalPrice) > Number(course.price) && (
                        <p className="text-xs text-slate-400 line-through">
                          {formatPrice(course.originalPrice)}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(course)}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      aria-label={`Delete ${course.title || "course"}`}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InstructorCourses;
