
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  ImagePlus,
  Save,
  Eye,
  Clock,
  IndianRupee,
  Tag,
  FileText,
  GraduationCap,
  CheckCircle,
  X,
} from "lucide-react";

const STORAGE_KEY = "lms-created-courses";

const categories = [
  "Web Development",
  "Data Science",
  "UI/UX Design",
  "Digital Marketing",
  "Programming",
  "Business",
];

const initialForm = {
  title: "",
  subtitle: "",
  description: "",
  category: "Web Development",
  level: "Beginner",
  price: "",
  originalPrice: "",
  duration: "",
  image: "",
  instructor: "",
};

function CourseBuilder() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Course title is required.";
    }

    if (!form.subtitle.trim()) {
      newErrors.subtitle = "Please enter a course subtitle.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Please enter a course description.";
    } else if (form.description.trim().length < 20) {
      newErrors.description =
        "Description must contain at least 20 characters.";
    }

    if (!form.instructor.trim()) {
      newErrors.instructor = "Instructor name is required.";
    }

    if (form.price === "" || Number(form.price) < 0) {
      newErrors.price = "Enter a valid course price.";
    }

    if (
      form.originalPrice !== "" &&
      Number(form.originalPrice) < Number(form.price)
    ) {
      newErrors.originalPrice =
        "Original price must be equal to or greater than the course price.";
    }

    if (form.duration === "" || Number(form.duration) <= 0) {
      newErrors.duration = "Duration must be greater than 0 hours.";
    }

    if (!form.image.trim()) {
      newErrors.image = "Course image URL is required.";
    } else {
      try {
        const imageUrl = new URL(form.image.trim());

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          newErrors.image = "Enter a valid HTTP or HTTPS image URL.";
        }
      } catch {
        newErrors.image = "Enter a valid image URL.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreview = () => {
    setMessage("");

    if (!validateForm()) {
      setMessage("Please fix the highlighted fields first.");
      return;
    }

    setShowPreview(true);
  };

  const handleSubmit = (event) => {
    event?.preventDefault();

    setMessage("");

    if (!validateForm()) {
      setShowPreview(false);
      setMessage("Please fix the highlighted fields first.");
      return;
    }

    const newCourse = {
      id: `instructor-${Date.now()}`,
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      description: form.description.trim(),
      category: form.category,
      level: form.level,
      price: Number(form.price),
      originalPrice:
        form.originalPrice === ""
          ? Number(form.price)
          : Number(form.originalPrice),
      duration: `${Number(form.duration)} hours`,
      image: form.image.trim(),
      instructor: form.instructor.trim(),
      rating: 0,
      students: 0,
      curriculum: [],
      status: "published",
      createdAt: new Date().toISOString(),
    };

    try {
      const existingData = localStorage.getItem(STORAGE_KEY);
      const savedCourses = existingData ? JSON.parse(existingData) : [];

      if (!Array.isArray(savedCourses)) {
        throw new Error("Saved course data is invalid.");
      }

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...savedCourses, newCourse])
      );

      setShowPreview(false);
      navigate("/instructor/courses", {
        state: { message: "Course published successfully!" },
      });
    } catch (error) {
      console.error("Unable to save course:", error);
      setMessage(
        "Unable to save the course. Please check your browser storage."
      );
    }
  };

  const inputClass = (field) =>
    `mt-2 w-full rounded-xl border ${
      errors[field] ? "border-red-500" : "border-slate-200"
    } bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100`;

  const errorText = (field) =>
    errors[field] ? (
      <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
    ) : null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/instructor/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <BookOpen size={28} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create a New Course
          </h1>

          <p className="mt-2 text-slate-500">
            Add course details, set your pricing, and publish your course.
          </p>
        </div>

        {message && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          noValidate
        >
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <FileText size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Basic Information
                </h2>
                <p className="text-sm text-slate-500">
                  Tell students what they will learn.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-slate-700"
                >
                  Course Title *
                </label>

                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Complete React Developer Course"
                  className={inputClass("title")}
                />

                {errorText("title")}
              </div>

              <div>
                <label
                  htmlFor="subtitle"
                  className="text-sm font-semibold text-slate-700"
                >
                  Course Subtitle *
                </label>

                <input
                  id="subtitle"
                  name="subtitle"
                  value={form.subtitle}
                  onChange={handleChange}
                  placeholder="A short and attractive course tagline"
                  className={inputClass("subtitle")}
                />

                {errorText("subtitle")}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-slate-700"
                >
                  Course Description *
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Explain what students will learn in this course..."
                  className={inputClass("description")}
                />

                <p className="mt-1 text-xs text-slate-400">
                  {form.description.length} characters
                </p>

                {errorText("description")}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="category"
                    className="text-sm font-semibold text-slate-700"
                  >
                    <Tag className="mr-1 inline" size={15} />
                    Category *
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={inputClass("category")}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="level"
                    className="text-sm font-semibold text-slate-700"
                  >
                    <GraduationCap className="mr-1 inline" size={17} />
                    Difficulty Level *
                  </label>

                  <select
                    id="level"
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    className={inputClass("level")}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="instructor"
                  className="text-sm font-semibold text-slate-700"
                >
                  Instructor Name *
                </label>

                <input
                  id="instructor"
                  name="instructor"
                  value={form.instructor}
                  onChange={handleChange}
                  placeholder="Enter instructor name"
                  className={inputClass("instructor")}
                />

                {errorText("instructor")}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <IndianRupee size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Pricing and Duration
                </h2>
                <p className="text-sm text-slate-500">
                  Set the price and course length.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="price"
                  className="text-sm font-semibold text-slate-700"
                >
                  Course Price (₹) *
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="499"
                  className={inputClass("price")}
                />

                {errorText("price")}
              </div>

              <div>
                <label
                  htmlFor="originalPrice"
                  className="text-sm font-semibold text-slate-700"
                >
                  Original Price (₹)
                </label>

                <input
                  id="originalPrice"
                  name="originalPrice"
                  type="number"
                  min="0"
                  step="1"
                  value={form.originalPrice}
                  onChange={handleChange}
                  placeholder="1999"
                  className={inputClass("originalPrice")}
                />

                {errorText("originalPrice")}
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="text-sm font-semibold text-slate-700"
                >
                  <Clock className="mr-1 inline" size={15} />
                  Duration (Hours) *
                </label>

                <input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  step="1"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="32"
                  className={inputClass("duration")}
                />

                {errorText("duration")}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <ImagePlus size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Course Thumbnail
                </h2>
                <p className="text-sm text-slate-500">
                  Add an image URL for your course cover.
                </p>
              </div>
            </div>

            <label
              htmlFor="image"
              className="text-sm font-semibold text-slate-700"
            >
              Image URL *
            </label>

            <input
              id="image"
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/course-image.jpg"
              className={inputClass("image")}
            />

            {errorText("image")}

            {form.image.trim() && !errors.image && (
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                <img
                  src={form.image}
                  alt="Course thumbnail preview"
                  className="h-52 w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                  onLoad={(event) => {
                    event.currentTarget.style.display = "block";
                  }}
                />
              </div>
            )}
          </section>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handlePreview}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <Eye size={18} />
              Preview Course
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <Save size={18} />
              Save & Publish Course
            </button>
          </div>
        </form>
      </div>

      {showPreview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-title"
        >
          <div className="my-8 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2
                id="preview-title"
                className="text-lg font-bold text-slate-900"
              >
                Course Preview
              </h2>

              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close preview"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto">
              <img
                src={form.image}
                alt={form.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {form.category}
                </span>

                <h3 className="mt-4 text-2xl font-bold text-slate-900">
                  {form.title}
                </h3>

                <p className="mt-2 text-slate-600">{form.subtitle}</p>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                  {form.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span>{form.instructor}</span>
                  <span>{form.level}</span>
                  <span>{form.duration} hours</span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <span className="text-2xl font-bold text-slate-900">
                    ₹{Number(form.price).toLocaleString("en-IN")}
                  </span>

                  {form.originalPrice !== "" &&
                    Number(form.originalPrice) > Number(form.price) && (
                      <span className="text-slate-400 line-through">
                        ₹
                        {Number(form.originalPrice).toLocaleString("en-IN")}
                      </span>
                    )}
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 p-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Continue Editing
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
              >
                <CheckCircle size={18} />
                Save & Publish Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseBuilder;
