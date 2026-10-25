import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Video,
  Plus,
  PlayCircle,
  Clock,
  BookOpen,
  Trash2,
  Eye,
  Link as LinkIcon,
  FileText,
  CheckCircle,
  CirclePlay,
} from "lucide-react";
import { courses } from "../../data/courses";

const STORAGE_KEY = "lms-lecture-drafts";

const emptyForm = {
  courseId: "",
  title: "",
  description: "",
  videoUrl: "",
  duration: "",
  preview: false,
};

const getSavedLectures = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const LectureUpload = () => {
  const [form, setForm] = useState(emptyForm);
  const [lectures, setLectures] = useState(getSavedLectures);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [previewLecture, setPreviewLecture] = useState(null);

  const selectedCourse = courses.find(
    (course) => String(course.id) === String(form.courseId)
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({ ...previous, [name]: "" }));
    setMessage("");
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.courseId) {
      nextErrors.courseId = "Please select a course.";
    }

    if (!form.title.trim()) {
      nextErrors.title = "Lecture title is required.";
    }

    if (!form.description.trim()) {
      nextErrors.description = "Please enter a lecture description.";
    }

    if (!form.videoUrl.trim()) {
      nextErrors.videoUrl = "Please enter a video URL.";
    } else {
      try {
        const url = new URL(form.videoUrl.trim());
        if (!["http:", "https:"].includes(url.protocol)) {
          nextErrors.videoUrl = "Please use a valid HTTP or HTTPS URL.";
        }
      } catch {
        nextErrors.videoUrl = "Please enter a valid video URL.";
      }
    }

    if (form.duration === "" || Number(form.duration) <= 0) {
      nextErrors.duration = "Duration must be greater than zero.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const persistLectures = (updatedLectures) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLectures));
      setLectures(updatedLectures);
      return true;
    } catch {
      setMessage("Unable to save. Please check your browser storage.");
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setMessage("Please fix the highlighted fields.");
      return;
    }

    const newLecture = {
      id: `lecture-${Date.now()}`,
      courseId: String(form.courseId),
      courseTitle: selectedCourse?.title || "Course",
      title: form.title.trim(),
      description: form.description.trim(),
      videoUrl: form.videoUrl.trim(),
      duration: `${Number(form.duration)} min`,
      preview: form.preview,
      createdAt: new Date().toISOString(),
    };

    const updatedLectures = [newLecture, ...lectures];

    if (persistLectures(updatedLectures)) {
      setForm(emptyForm);
      setErrors({});
      setMessage("Lecture saved successfully on this device.");
    }
  };

  const handleDelete = (lectureId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lecture draft?"
    );

    if (!confirmed) return;

    const updatedLectures = lectures.filter(
      (lecture) => lecture.id !== lectureId
    );

    if (persistLectures(updatedLectures)) {
      setMessage("Lecture draft deleted.");
    }
  };

  const getVideoEmbedUrl = (url) => {
    try {
      const parsedUrl = new URL(url);

      if (
        parsedUrl.hostname === "youtu.be" ||
        parsedUrl.hostname.endsWith(".youtu.be")
      ) {
        const videoId = parsedUrl.pathname.split("/").filter(Boolean)[0];
        return videoId
          ? `https://www.youtube-nocookie.com/embed/${videoId}`
          : null;
      }

      if (
        parsedUrl.hostname === "youtube.com" ||
        parsedUrl.hostname.endsWith(".youtube.com")
      ) {
        const videoId =
          parsedUrl.searchParams.get("v") ||
          parsedUrl.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1];

        return videoId
          ? `https://www.youtube-nocookie.com/embed/${videoId}`
          : null;
      }

      return null;
    } catch {
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-8">
          <Link
            to="/instructor/dashboard"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Lecture Management
              </h1>
              <p className="mt-2 text-slate-500">
                Add, preview, and manage lectures for your courses.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700">
              <Video size={19} />
              {lectures.length} Saved Lectures
            </div>
          </div>
        </div>

        {message && (
          <div
            role="status"
            className="mb-6 flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-800"
          >
            <CheckCircle size={19} className="mt-0.5 shrink-0" />
            <p>{message}</p>
          </div>
        )}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
          {/* Add lecture form */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Plus size={23} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add New Lecture
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the lecture details below.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="courseId"
                  className="text-sm font-semibold text-slate-700"
                >
                  Select Course *
                </label>
                <select
                  id="courseId"
                  name="courseId"
                  value={form.courseId}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  aria-invalid={Boolean(errors.courseId)}
                >
                  <option value="">Choose a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                {errors.courseId && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.courseId}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-slate-700"
                >
                  Lecture Title *
                </label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  maxLength={120}
                  placeholder="e.g. Introduction to React"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  aria-invalid={Boolean(errors.title)}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-slate-700"
                >
                  Lecture Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  maxLength={2000}
                  placeholder="Explain what students will learn in this lecture..."
                  className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  aria-invalid={Boolean(errors.description)}
                />
                <p className="mt-1 text-right text-xs text-slate-400">
                  {form.description.length}/2000
                </p>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="videoUrl"
                  className="text-sm font-semibold text-slate-700"
                >
                  Video URL *
                </label>
                <div className="relative">
                  <LinkIcon
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="videoUrl"
                    name="videoUrl"
                    type="url"
                    value={form.videoUrl}
                    onChange={handleChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="mt-2 w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    aria-invalid={Boolean(errors.videoUrl)}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  YouTube links can be previewed here. Other links are saved
                  for reference.
                </p>
                {errors.videoUrl && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.videoUrl}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="text-sm font-semibold text-slate-700"
                >
                  Duration (minutes) *
                </label>
                <div className="relative">
                  <Clock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="duration"
                    name="duration"
                    type="number"
                    min="1"
                    step="1"
                    value={form.duration}
                    onChange={handleChange}
                    placeholder="15"
                    className="mt-2 w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    aria-invalid={Boolean(errors.duration)}
                  />
                </div>
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.duration}
                  </p>
                )}
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
                <input
                  type="checkbox"
                  name="preview"
                  checked={form.preview}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 accent-indigo-600"
                />
                <span>
                  <span className="block text-sm font-semibold text-slate-800">
                    Free preview lecture
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    Mark this lecture as a preview for prospective students.
                  </span>
                </span>
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              >
                <Plus size={19} />
                Save Lecture
              </button>
            </form>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Selected Course
                  </h2>
                  <p className="text-sm text-slate-500">
                    Course details
                  </p>
                </div>
              </div>

              {selectedCourse ? (
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {selectedCourse.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {selectedCourse.category}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {selectedCourse.level || "All Levels"}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      ID: {selectedCourse.id}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-6 text-slate-500">
                  Select a course from the form to see its details here.
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Saved Lecture Drafts
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Lectures saved in this browser.
                  </p>
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700">
                  {lectures.length}
                </span>
              </div>

              {lectures.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center">
                  <Video
                    size={34}
                    className="mx-auto text-slate-300"
                  />
                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    No lecture drafts yet
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your saved lectures will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {lectures.map((lecture) => (
                    <article
                      key={lecture.id}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <CirclePlay size={21} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="break-words text-sm font-semibold text-slate-900">
                            {lecture.title}
                          </h3>
                          <p className="mt-1 break-words text-xs text-slate-500">
                            {lecture.courseTitle}
                          </p>
                          <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                            <Clock size={13} />
                            {lecture.duration}
                            {lecture.preview && (
                              <span className="ml-1 rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                                Free preview
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewLecture(lecture)}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          <Eye size={15} />
                          Preview
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(lecture.id)}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                          aria-label={`Delete ${lecture.title}`}
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-center gap-2 text-amber-800">
                <FileText size={19} />
                <h3 className="font-bold">Important Note</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-amber-900/80">
                These are local demo drafts. They are not uploaded to a server
                and are not yet connected to the student course player.
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* Lecture preview modal */}
      {previewLecture && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setPreviewLecture(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lecture-preview-title"
            className="my-6 w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
              <div>
                <h2
                  id="lecture-preview-title"
                  className="text-xl font-bold text-slate-900"
                >
                  {previewLecture.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {previewLecture.courseTitle} · {previewLecture.duration}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewLecture(null)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <div className="p-5 sm:p-6">
              {getVideoEmbedUrl(previewLecture.videoUrl) ? (
                <div className="aspect-video overflow-hidden rounded-xl bg-black">
                  <iframe
                    src={getVideoEmbedUrl(previewLecture.videoUrl)}
                    title={previewLecture.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              ) : (
                <div className="rounded-xl bg-slate-50 p-6 text-center">
                  <Video size={36} className="mx-auto text-slate-400" />
                  <p className="mt-3 font-semibold text-slate-800">
                    Video preview is unavailable here
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    This preview supports standard YouTube watch, shorts, and
                    short links.
                  </p>
                  <a
                    href={previewLecture.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Open Video Link
                  </a>
                </div>
              )}

              <div className="mt-5">
                <h3 className="flex items-center gap-2 font-semibold text-slate-900">
                  <FileText size={18} />
                  Lecture Description
                </h3>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                  {previewLecture.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LectureUpload;