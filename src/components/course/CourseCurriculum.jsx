import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  PlayCircle,
  Lock,
  Clock,
  BookOpen,
} from "lucide-react";

function CourseCurriculum({ curriculum = [] }) {
  const safeCurriculum = Array.isArray(curriculum)
    ? curriculum.map((section, index) => ({
        ...section,
        id: section?.id ?? `section-${index}`,
        title: section?.title || `Section ${index + 1}`,
        lectures: Array.isArray(section?.lectures)
          ? section.lectures
          : [],
      }))
    : [];

  const [openSections, setOpenSections] = useState(() =>
    safeCurriculum.length > 0 ? [safeCurriculum[0].id] : []
  );

  const toggleSection = (id) => {
    setOpenSections((previous) =>
      previous.includes(id)
        ? previous.filter((sectionId) => sectionId !== id)
        : [...previous, id]
    );
  };

  const totalLectures = safeCurriculum.reduce(
    (total, section) => total + section.lectures.length,
    0
  );

  if (safeCurriculum.length === 0) {
    return (
      <section aria-labelledby="curriculum-heading">
        <h2
          id="curriculum-heading"
          className="text-2xl font-bold text-slate-900"
        >
          Course Curriculum
        </h2>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center">
          <BookOpen
            size={36}
            className="mx-auto text-slate-400"
            aria-hidden="true"
          />

          <h3 className="mt-4 font-semibold text-slate-800">
            Curriculum coming soon
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            The instructor has not added any lectures to this course yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="curriculum-heading">
      <div className="mb-5">
        <h2
          id="curriculum-heading"
          className="text-2xl font-bold text-slate-900"
        >
          Course Curriculum
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {safeCurriculum.length} sections · {totalLectures} lectures
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        {safeCurriculum.map((section) => {
          const isOpen = openSections.includes(section.id);

          return (
            <div
              key={section.id}
              className="border-b border-slate-200 last:border-b-0"
            >
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 bg-slate-50 px-4 py-4 text-left transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 sm:px-5"
              >
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {section.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {section.lectures.length} lectures
                  </p>
                </div>

                {isOpen ? (
                  <ChevronUp
                    className="shrink-0 text-slate-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDown
                    className="shrink-0 text-slate-500"
                    aria-hidden="true"
                  />
                )}
              </button>

              {isOpen && (
                <div className="divide-y divide-slate-100 bg-white">
                  {section.lectures.length > 0 ? (
                    section.lectures.map((lecture, index) => {
                      const lectureId =
                        lecture?.id ?? `${section.id}-lecture-${index}`;

                      return (
                        <div
                          key={lectureId}
                          className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <PlayCircle
                              size={18}
                              className="shrink-0 text-indigo-500"
                              aria-hidden="true"
                            />

                            <span className="break-words text-sm text-slate-700">
                              {lecture?.title || `Lecture ${index + 1}`}
                            </span>
                          </div>

                          <div className="flex shrink-0 items-center gap-3">
                            {lecture?.preview ? (
                              <span className="hidden text-xs font-medium text-indigo-600 sm:inline">
                                Preview
                              </span>
                            ) : (
                              <Lock
                                size={14}
                                className="text-slate-400"
                                aria-label="Restricted lecture"
                              />
                            )}

                            <span className="flex items-center gap-1 text-xs text-slate-500">
                              <Clock size={13} aria-hidden="true" />
                              {lecture?.duration || "—"}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="px-5 py-4 text-sm text-slate-500">
                      No lectures have been added to this section yet.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CourseCurriculum;