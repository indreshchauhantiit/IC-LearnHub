import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Star,
  Users,
  Clock,
  Globe,
  Award,
  CheckCircle,
  BookOpen,
  ChevronRight,
} from "lucide-react";

import { courses as defaultCourses } from "../../data/courses";
import CourseCurriculum from "../../components/course/CourseCurriculum";
import EnrollmentCard from "../../components/course/EnrollmentCard";

const defaultCurriculum = [
  {
    id: 1,
    title: "Introduction and Fundamentals",
    lectures: [
      { id: 1, title: "Course introduction", duration: "10:00", preview: true },
      { id: 2, title: "Getting started", duration: "18:30", preview: false },
    ],
  },
  {
    id: 2,
    title: "Core Concepts and Practical Skills",
    lectures: [
      { id: 3, title: "Understanding the fundamentals", duration: "22:00", preview: false },
      { id: 4, title: "Practical exercises", duration: "25:00", preview: false },
    ],
  },
  {
    id: 3,
    title: "Projects and Final Review",
    lectures: [
      { id: 5, title: "Building a practical project", duration: "35:00", preview: false },
      { id: 6, title: "Final review", duration: "15:00", preview: false },
    ],
  },
];

function CourseDetail() {
  const { courseId } = useParams();
  const [allCourses, setAllCourses] = useState(defaultCourses);

  useEffect(() => {
    function loadCourses() {
      try {
        const savedCourses = JSON.parse(
          localStorage.getItem("lms-created-courses") || "[]"
        );

        const publishedCourses = Array.isArray(savedCourses)
          ? savedCourses.filter((course) => course.status === "published")
          : [];

        const mergedCourses = [
          ...defaultCourses,
          ...publishedCourses.filter(
            (createdCourse) =>
              !defaultCourses.some(
                (defaultCourse) =>
                  String(defaultCourse.id) === String(createdCourse.id)
              )
          ),
        ];

        setAllCourses(mergedCourses);
      } catch (error) {
        console.error("Unable to load saved courses:", error);
        setAllCourses(defaultCourses);
      }
    }

    loadCourses();

    window.addEventListener("storage", loadCourses);

    return () => {
      window.removeEventListener("storage", loadCourses);
    };
  }, []);

  const course = allCourses.find(
    (item) => String(item.id) === String(courseId)
  );

  if (!course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <BookOpen size={48} className="text-slate-300" />
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Course Not Found
        </h1>
        <p className="mt-2 text-slate-500">
          The course may not exist or may no longer be published.
        </p>
        <Link
          to="/courses"
          className="mt-6 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  const instructor = course.instructorInfo || {
    name: course.instructor || "Course Instructor",
    title: "Course Instructor",
    bio: "An experienced instructor sharing practical knowledge and helping students develop new skills.",
    students: Number(course.students || 0),
    courses: 1,
    avatar: null,
  };

  const instructorName = instructor.name || course.instructor || "Course Instructor";

  const outcomes = course.outcomes || [
    `Understand the fundamentals of ${course.category || "this subject"}`,
    "Develop practical skills through guided lessons",
    "Apply course concepts to real-world projects",
    "Build confidence in your chosen subject",
  ];

  const requirements = course.requirements || [
    "A computer with internet access",
    "Interest in learning new skills",
    "Basic computer knowledge",
  ];

  const curriculum = Array.isArray(course.curriculum)
  ? course.curriculum
  : [];

  const rating = Number(course.rating || 0);
  const studentCount = Number(course.students || 0);
  const instructorStudents = Number(instructor.students || 0);
  const instructorCourses = Number(instructor.courses || 1);

  return (
    <div className="min-h-screen bg-white">
      {/* COURSE HERO */}
      <section className="bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight size={15} />
            <Link to="/courses" className="hover:text-white">
              Courses
            </Link>
            <ChevronRight size={15} />
            <span className="text-indigo-300">{course.category || "General"}</span>
          </div>

          <div className="max-w-3xl">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
              {course.category || "General"}
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {course.title || "Untitled Course"}
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">
              {course.subtitle ||
                `Develop practical ${(course.category || "professional").toLowerCase()} skills with this course.`}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
              <span className="flex items-center gap-1 font-semibold text-yellow-400">
                <Star size={17} className={rating > 0 ? "fill-yellow-400" : ""} />
                {rating > 0 ? rating.toFixed(1) : "New course"}
              </span>

              <span className="text-slate-300">
                {studentCount.toLocaleString("en-IN")} students
              </span>

              <span className="text-slate-300">
                {course.level || "All Levels"}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {instructor.avatar ? (
                <img
                  src={instructor.avatar}
                  alt={instructorName}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold">
                  {instructorName.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <p className="text-xs text-slate-400">Created by</p>
                <p className="font-semibold text-white">{instructorName}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {course.duration || "Self-paced"}
              </span>

              <span className="flex items-center gap-2">
                <Globe size={16} />
                {course.language || "English"}
              </span>

              <span className="flex items-center gap-2">
                <Award size={16} />
                Certificate
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3">
          {/* LEFT CONTENT */}
          <div className="space-y-12 lg:col-span-2">
            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                About This Course
              </h2>
              <p className="mt-4 leading-8 text-slate-600">
                {course.description ||
                  `Explore ${course.title} and gain practical knowledge in ${course.category || "this subject"}.`}
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900">
                What You'll Learn
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckCircle
                      size={19}
                      className="mt-1 shrink-0 text-green-600"
                    />
                    <p className="text-sm leading-6 text-slate-600">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <CourseCurriculum curriculum={curriculum} />

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                Requirements
              </h2>

              <ul className="mt-5 space-y-3">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex gap-3 text-slate-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                    <span className="leading-7">{requirement}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900">
                Meet Your Instructor
              </h2>

              <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-slate-200 p-6 sm:flex-row">
                {instructor.avatar ? (
                  <img
                    src={instructor.avatar}
                    alt={instructorName}
                    className="h-24 w-24 shrink-0 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-3xl font-bold text-indigo-600">
                    {instructorName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">
                    {instructorName}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-indigo-600">
                    {instructor.title || "Course Instructor"}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {instructor.bio ||
                      "An instructor helping students learn practical skills."}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <Users size={16} />
                      {instructorStudents.toLocaleString("en-IN")} students
                    </span>

                    <span className="flex items-center gap-2">
                      <BookOpen size={16} />
                      {instructorCourses} courses
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT ENROLLMENT CARD */}
          <div className="lg:sticky lg:top-24">
            <EnrollmentCard course={course} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default CourseDetail;
