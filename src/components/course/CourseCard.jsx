import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Users,
  Clock,
  ArrowRight,
  BookOpen,
} from "lucide-react";

function CourseCard({ course }) {
  const [imageError, setImageError] = useState(false);

  if (!course || course.id == null) {
    return null;
  }

  const {
    id,
    title = "Untitled Course",
    subtitle = "",
    image = "",
    badge = "",
    category = "General",
    instructor = "Instructor",
    rating = 0,
    students = 0,
    duration = "Self-paced",
    level = "All Levels",
    price = 0,
    originalPrice = 0,
  } = course;

  const courseLink = `/courses/${encodeURIComponent(String(id))}`;

  const safeNumber = (value, fallback = 0) => {
    const number = Number(value);
    return Number.isFinite(number) && number >= 0
      ? number
      : fallback;
  };

  const numericPrice = safeNumber(price);
  const numericOriginalPrice = safeNumber(originalPrice);
  const numericStudents = safeNumber(students);
  const numericRating = Math.min(safeNumber(rating), 5);

  const formattedPrice = numericPrice.toLocaleString("en-IN");

  const formattedOriginalPrice =
    numericOriginalPrice.toLocaleString("en-IN");

  const formattedStudents = numericStudents.toLocaleString("en-IN");

  const showOriginalPrice =
    numericOriginalPrice > numericPrice;

  const discountPercentage = showOriginalPrice
    ? Math.round(
        ((numericOriginalPrice - numericPrice) /
          numericOriginalPrice) *
          100
      )
    : 0;

  const hasImage =
    typeof image === "string" &&
    image.trim().length > 0 &&
    !imageError;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">
      {/* Course Image */}
      <Link
        to={courseLink}
        aria-label={`View course: ${title}`}
        className="relative block overflow-hidden bg-slate-100"
      >
        {hasImage ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
            className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-48 w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-400">
            <BookOpen size={42} aria-hidden="true" />
            <span className="text-sm font-medium">
              Course image unavailable
            </span>
          </div>
        )}

        {badge && (
          <span className="absolute left-3 top-3 rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {badge}
          </span>
        )}

        {discountPercentage > 0 && (
          <span className="absolute right-3 top-3 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            {discountPercentage}% OFF
          </span>
        )}
      </Link>

      {/* Course Information */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          {category}
        </p>

        <Link
          to={courseLink}
          className="mt-2 block"
        >
          <h3 className="min-h-12 font-bold leading-6 text-slate-900 transition hover:text-indigo-600">
            {title}
          </h3>
        </Link>

        {subtitle && (
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">
            {subtitle}
          </p>
        )}

        <p className="mt-2 text-sm text-slate-500">
          By {instructor}
        </p>

        {/* Rating and Students */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="flex items-center gap-1 font-semibold text-slate-800">
            <Star
              size={16}
              aria-hidden="true"
              className={
                numericRating > 0
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-400"
              }
            />

            {numericRating > 0
              ? numericRating.toFixed(1)
              : "New"}
          </span>

          <span className="flex items-center gap-1 text-slate-500">
            <Users size={15} aria-hidden="true" />
            {formattedStudents} students
          </span>
        </div>

        {/* Duration and Level */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Clock size={14} aria-hidden="true" />
          <span>{duration}</span>

          <span aria-hidden="true">•</span>

          <span>{level}</span>
        </div>

        {/* Price and Course Details */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900">
                ₹{formattedPrice}
              </span>

              {showOriginalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{formattedOriginalPrice}
                </span>
              )}
            </div>

            {showOriginalPrice && (
              <p className="mt-1 text-xs font-medium text-emerald-700">
                You save ₹
                {(numericOriginalPrice - numericPrice).toLocaleString(
                  "en-IN"
                )}
              </p>
            )}
          </div>

          <Link
            to={courseLink}
            aria-label={`View details for ${title}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition hover:bg-indigo-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;