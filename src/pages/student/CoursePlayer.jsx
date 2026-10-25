
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  LockKeyhole,
  ExternalLink,
  Video,
} from "lucide-react";

import { courses } from "../../data/courses";
import { useEnrollments } from "../../context/EnrollmentContext";
import { getInstructorLectures } from "../../utils/lectureStorage";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");
    let videoId = "";

    if (host === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1);
    } else if (
      host === "youtube.com" ||
      host.endsWith(".youtube.com")
    ) {
      if (parsedUrl.pathname === "/watch") {
        videoId = parsedUrl.searchParams.get("v") || "";
      } else if (
        parsedUrl.pathname.startsWith("/embed/") ||
        parsedUrl.pathname.startsWith("/shorts/")
      ) {
        videoId = parsedUrl.pathname.split("/")[2] || "";
      }
    }

    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) return "";

    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  } catch {
    return "";
  }
};

const isDirectVideo = (url = "") =>
  /\.(mp4|webm|ogg)(?:$|[?#])/i.test(url);

const CoursePlayer = () => {
  const { courseId } = useParams();

  const {
    enrolledCourses,
    markLessonComplete,
    getProgress,
    isEnrolled,
  } = useEnrollments();

  const [activeLectureId, setActiveLectureId] = useState(null);

  const catalogCourse = courses.find(
    (item) => String(item.id) === String(courseId)
  );

  const enrolledCourse = enrolledCourses.find(
    (item) => String(item.id) === String(courseId)
  );

  if (!catalogCourse) {
    return <Navigate to="/courses" replace />;
  }

  if (!isEnrolled(courseId)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow">
          <LockKeyhole
            size={48}
            className="mx-auto mb-4 text-indigo-600"
          />

          <h1 className="text-2xl font-bold text-slate-900">
            Course not enrolled
          </h1>

          <p className="mt-3 text-slate-600">
            Is course ko dekhne ke liye pehle enroll karein.
          </p>

          <Link
            to={`/courses/${courseId}`}
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            View Course
          </Link>
        </div>
      </div>
    );
  }

  const course = {
    ...catalogCourse,
    ...enrolledCourse,
  };

  // Existing curriculum sections
  const originalSections = (course.curriculum || []).map(
    (section, index) => ({
      ...section,
      id: section.id ?? `section-${index}`,
      lectures: (section.lectures || []).map((lecture) => ({
        ...lecture,
        sectionTitle: section.title,
        source: "curriculum",
      })),
    })
  );

  // Instructor-added lectures saved in localStorage
  const instructorLectures = getInstructorLectures(courseId).map(
    (lecture) => ({
      ...lecture,
      sectionTitle: "Instructor Added Lectures",
      source: "instructor",
    })
  );

  // Add instructor lectures as a separate section
  const sections = [
    ...originalSections,
    ...(instructorLectures.length > 0
      ? [
          {
            id: "instructor-added-section",
            title: "Instructor Added Lectures",
            lectures: instructorLectures,
          },
        ]
      : []),
  ];

  const lectures = sections.flatMap((section) => section.lectures);

  const completedLessons = enrolledCourse?.completedLessons || [];

  const currentLecture =
    lectures.find(
      (lecture) => String(lecture.id) === String(activeLectureId)
    ) || lectures[0];

  const currentIndex = currentLecture
    ? lectures.findIndex(
        (lecture) => String(lecture.id) === String(currentLecture.id)
      )
    : -1;

  const progress = getProgress(courseId, lectures.length);

  const isLectureComplete = (lectureId) =>
    completedLessons.some((id) => String(id) === String(lectureId));

  const goToLecture = (lecture) => {
    if (lecture) {
      setActiveLectureId(lecture.id);
    }
  };

  const handleComplete = () => {
    if (!currentLecture) return;

    if (!isLectureComplete(currentLecture.id)) {
      markLessonComplete(courseId, currentLecture.id);
    }

    const nextLecture = lectures[currentIndex + 1];

    if (nextLecture) {
      setActiveLectureId(nextLecture.id);
    }
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(
    currentLecture?.videoUrl
  );

  const directVideoUrl =
    currentLecture?.videoUrl && isDirectVideo(currentLecture.videoUrl)
      ? currentLecture.videoUrl
      : "";

  if (lectures.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <h1 className="text-2xl font-bold">{course.title}</h1>

        <p className="mt-3 text-slate-600">
          Is course ke liye abhi lectures available nahi hain.
        </p>

        <Link
          to="/student/dashboard"
          className="mt-5 inline-block text-indigo-600"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-950 px-4 py-4 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <Link
            to="/student/dashboard"
            className="rounded-lg p-2 hover:bg-slate-800"
            aria-label="Back to dashboard"
          >
            <ChevronLeft size={22} />
          </Link>

          <div className="min-w-0">
            <p className="text-sm text-slate-400">Course Player</p>

            <h1 className="truncate text-lg font-bold sm:text-xl">
              {course.title}
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_360px]">
        <section className="min-w-0">
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="aspect-video overflow-hidden bg-slate-950">
              {youtubeEmbedUrl ? (
                <iframe
                  key={currentLecture.id}
                  src={youtubeEmbedUrl}
                  title={currentLecture.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : directVideoUrl ? (
                <video
                  key={currentLecture.id}
                  src={directVideoUrl}
                  controls
                  className="h-full w-full"
                  preload="metadata"
                >
                  Your browser does not support video playback.
                </video>
              ) : (
                <div className="flex h-full flex-col items-center justify-center p-6 text-center text-white">
                  {currentLecture?.videoUrl ? (
                    <>
                      <ExternalLink
                        size={48}
                        className="mb-4 text-indigo-400"
                      />

                      <h2 className="text-xl font-bold">
                        Open Lecture Video
                      </h2>

                      <p className="mt-2 text-sm text-slate-300">
                        Is video URL ko alag tab mein khol sakte hain.
                      </p>

                      <a
                        href={currentLecture.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold hover:bg-indigo-700"
                      >
                        <PlayCircle size={18} />
                        Open Video
                      </a>
                    </>
                  ) : (
                    <>
                      <Video
                        size={56}
                        className="mb-4 text-indigo-400"
                      />

                      <h2 className="text-xl font-bold">
                        {currentLecture?.title}
                      </h2>

                      <p className="mt-3 max-w-md text-sm text-slate-300">
                        Is lecture ke liye abhi video URL add nahi kiya gaya
                        hai. Instructor se video link add karwayein.
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-indigo-600">
                    Lecture {currentIndex + 1} of {lectures.length}
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {currentLecture?.title}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Duration: {currentLecture?.duration || "Not specified"}
                  </p>
                </div>

                {isLectureComplete(currentLecture?.id) && (
                  <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                    <CheckCircle size={18} />
                    Completed
                  </span>
                )}
              </div>

              {currentLecture?.description && (
                <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
                  {currentLecture.description}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => goToLecture(lectures[currentIndex - 1])}
                  disabled={currentIndex <= 0}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 font-medium disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={handleComplete}
                  disabled={isLectureComplete(currentLecture?.id)}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-emerald-600"
                >
                  <CheckCircle size={18} />
                  {isLectureComplete(currentLecture?.id)
                    ? "Completed"
                    : "Mark Complete"}
                </button>

                <button
                  type="button"
                  onClick={() => goToLecture(lectures[currentIndex + 1])}
                  disabled={currentIndex >= lectures.length - 1}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 font-medium disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">
              About this course
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              {course.description}
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Instructor: {course.instructor}
            </p>
          </div>
        </section>

        <aside className="h-fit overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-lg font-bold text-slate-900">
              Course Content
            </h2>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-500">Your progress</span>

              <span className="font-bold text-indigo-600">
                {progress}%
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="max-h-[650px] overflow-y-auto">
            {sections.map((section) => (
              <div key={section.id}>
                <div className="bg-slate-50 px-5 py-3">
                  <h3 className="font-semibold text-slate-800">
                    {section.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {section.lectures.length} lectures
                  </p>
                </div>

                {section.lectures.map((lecture) => {
                  const isActive =
                    String(currentLecture?.id) === String(lecture.id);

                  const isComplete = isLectureComplete(lecture.id);

                  return (
                    <button
                      type="button"
                      key={`${section.id}-${lecture.id}`}
                      onClick={() => goToLecture(lecture)}
                      className={`flex w-full items-start gap-3 border-b border-slate-100 px-5 py-4 text-left transition ${
                        isActive ? "bg-indigo-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <span className="mt-0.5 text-indigo-600">
                        {isComplete ? (
                          <CheckCircle size={19} />
                        ) : (
                          <PlayCircle size={19} />
                        )}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-slate-800">
                          {lecture.title}
                        </span>

                        <span className="mt-1 block text-xs text-slate-500">
                          {lecture.duration || "Duration unavailable"}
                        </span>

                        {lecture.source === "instructor" && (
                          <span className="mt-1 inline-block text-xs font-medium text-indigo-600">
                            Instructor added
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 p-4">
            <Link
              to="/student/dashboard"
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              <BookOpen size={18} />
              My Dashboard
            </Link>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CoursePlayer;
