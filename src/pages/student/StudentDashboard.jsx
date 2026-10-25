import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CheckCircle,
  Clock,
  PlayCircle,
  GraduationCap,
  ArrowRight,
  Trophy,
  LogOut,
} from "lucide-react";

import { courses } from "../../data/courses";
import { useAuth } from "../../context/AuthContext";
import { useEnrollments } from "../../context/EnrollmentContext";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { enrolledCourses, getProgress } = useEnrollments();

  // Logout student and redirect to Login page.
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // Merge enrolled courses with original course data.
  const myCourses = enrolledCourses.map((enrolledCourse) => {
    const catalogCourse = courses.find(
      (item) => String(item.id) === String(enrolledCourse.id)
    );

    const course = {
      ...catalogCourse,
      ...enrolledCourse,
    };

    const totalLessons = Array.isArray(course.curriculum)
  ? course.curriculum.reduce(
      (total, section) =>
        total +
        (Array.isArray(section?.lectures)
          ? section.lectures.length
          : 0),
      0
    )
  : 0;

const completedCount = Array.isArray(course.completedLessons)
  ? new Set(course.completedLessons.map(String)).size
  : 0;

    return {
      ...course,
      totalLessons,
      completedCount: (course.completedLessons || []).length,
      progress: getProgress(course.id, totalLessons),
    };
  });

  const completedCourses = myCourses.filter(
    (course) => course.totalLessons > 0 && course.progress === 100
  ).length;

  const totalCompletedLessons = myCourses.reduce(
    (total, course) => total + course.completedCount,
    0
  );

  const continueCourse =
    myCourses.find(
      (course) => course.progress > 0 && course.progress < 100
    ) || myCourses.find((course) => course.progress < 100);

  const displayName =
    user?.name || user?.email?.split("@")[0] || "Student";

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome section */}
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 p-6 text-white shadow-lg sm:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-medium text-indigo-100">
                STUDENT DASHBOARD
              </p>

              <h1 className="text-3xl font-bold sm:text-4xl">
                Welcome back, {displayName}!
              </h1>

              <p className="mt-3 max-w-xl leading-7 text-indigo-100">
                Keep learning, track your progress, and take the next
                step toward your goals.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50"
                >
                  Explore Courses
                  <ArrowRight size={18} />
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>

            <div className="hidden h-32 w-32 shrink-0 items-center justify-center rounded-3xl bg-white/15 md:flex">
              <GraduationCap size={76} strokeWidth={1.4} />
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<BookOpen size={23} />}
            label="Enrolled Courses"
            value={myCourses.length}
            color="bg-indigo-50 text-indigo-600"
          />

          <StatCard
            icon={<CheckCircle size={23} />}
            label="Completed Courses"
            value={completedCourses}
            color="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            icon={<PlayCircle size={23} />}
            label="Lessons Completed"
            value={totalCompletedLessons}
            color="bg-sky-50 text-sky-600"
          />

          <StatCard
            icon={<Trophy size={23} />}
            label="Learning Status"
            value={
              myCourses.length === 0
                ? "Get started"
                : completedCourses === myCourses.length
                  ? "All complete"
                  : "In progress"
            }
            color="bg-amber-50 text-amber-600"
          />
        </section>

        {/* Continue Learning */}
        {continueCourse && (
          <section className="mt-10">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Continue Learning
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Pick up where you left off.
              </p>
            </div>

            <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:flex-row">
              {continueCourse.image ? (
                <img
                  src={continueCourse.image}
                  alt={continueCourse.title}
                  className="h-52 w-full object-cover md:h-auto md:w-64"
                />
              ) : (
                <div className="flex h-52 w-full items-center justify-center bg-indigo-50 text-indigo-600 md:h-auto md:w-64">
                  <BookOpen size={54} />
                </div>
              )}

              <div className="flex flex-1 flex-col justify-center p-6">
                <p className="text-sm font-semibold text-indigo-600">
                  {continueCourse.category}
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {continueCourse.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Instructor: {continueCourse.instructor}
                </p>

                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-slate-600">
                    {continueCourse.completedCount} of{" "}
                    {continueCourse.totalLessons} lessons
                  </span>
                  <span className="font-bold text-indigo-600">
                    {continueCourse.progress}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{
                      width: `${continueCourse.progress}%`,
                    }}
                  />
                </div>

                <div className="mt-5">
                  <Link
                    to={`/student/course/${continueCourse.id}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
                  >
                    <PlayCircle size={18} />
                    Continue Learning
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* My Courses */}
        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                My Courses
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your enrolled courses and learning progress.
              </p>
            </div>

            <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700">
              {myCourses.length} courses
            </span>
          </div>

          {myCourses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <GraduationCap size={34} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Start your learning journey
              </h3>

              <p className="mx-auto mt-2 max-w-md text-slate-500">
                You haven't enrolled in any courses yet. Explore the
                catalog and choose your first course.
              </p>

              <Link
                to="/courses"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
              >
                Browse Courses
                <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {myCourses.map((course) => (
                <article
                  key={course.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        loading="lazy"
                        className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-indigo-50 text-indigo-600">
                        <BookOpen size={48} />
                      </div>
                    )}

                    <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm">
                      {course.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-2 min-h-14 text-lg font-bold text-slate-900">
                      {course.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {course.instructor}
                    </p>

                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Clock size={16} />
                        {course.duration || "Self-paced"}
                      </span>
                      <span className="font-bold text-indigo-600">
                        {course.progress}%
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-indigo-600 transition-all"
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                      {course.completedCount} / {course.totalLessons} lessons
                      completed
                    </p>

                    <Link
                      to={`/student/course/${course.id}`}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
                    >
                      {course.progress === 100
                        ? "Review Course"
                        : course.progress > 0
                          ? "Continue Learning"
                          : "Start Learning"}
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Quick Links */}
        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          <QuickLink
            icon={<BookOpen size={22} />}
            title="Explore More Courses"
            description="Discover new skills and learning opportunities."
            to="/courses"
          />

          <QuickLink
            icon={<GraduationCap size={22} />}
            title="My Profile"
            description="View and manage your student profile."
            to="/student/profile"
          />
        </section>
      </main>
    </div>
  );
};

function StatCard({ icon, label, value, color }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-1 truncate text-xl font-bold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function QuickLink({ icon, title, description, to }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <ArrowRight size={19} className="shrink-0 text-slate-400" />
    </Link>
  );
}

export default StudentDashboard;