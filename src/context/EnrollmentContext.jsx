import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

const EnrollmentContext = createContext(null);
const STORAGE_KEY = "lms-enrollments";

function loadEnrollments() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) return {};

    const parsedData = JSON.parse(savedData);

    if (
      !parsedData ||
      typeof parsedData !== "object" ||
      Array.isArray(parsedData)
    ) {
      return {};
    }

    return parsedData;
  } catch (error) {
    console.error("Unable to load enrollments:", error);
    return {};
  }
}

export function EnrollmentProvider({ children }) {
  const { user } = useAuth();

  const [allEnrollments, setAllEnrollments] = useState(
    loadEnrollments
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(allEnrollments)
      );
    } catch (error) {
      console.error("Unable to save enrollments:", error);
    }
  }, [allEnrollments]);

  const emailKey = user?.email?.trim().toLowerCase() || "";

  const enrolledCourses = emailKey
    ? Array.isArray(allEnrollments[emailKey])
      ? allEnrollments[emailKey]
      : []
    : [];

  const enrollCourses = (courses) => {
    if (!emailKey || !Array.isArray(courses)) {
      return;
    }

    setAllEnrollments((previous) => {
      const existing = Array.isArray(previous[emailKey])
        ? previous[emailKey]
        : [];

      const merged = [...existing];

      courses.forEach((course) => {
        if (!course || course.id == null) {
          return;
        }

        const alreadyEnrolled = merged.some(
          (item) => String(item.id) === String(course.id)
        );

        if (!alreadyEnrolled) {
          merged.push({
            ...course,
            completedLessons: [],
          });
        }
      });

      return {
        ...previous,
        [emailKey]: merged,
      };
    });
  };

  const markLessonComplete = (courseId, lessonId) => {
    if (!emailKey || courseId == null || lessonId == null) {
      return;
    }

    setAllEnrollments((previous) => {
      const courses = Array.isArray(previous[emailKey])
        ? previous[emailKey]
        : [];

      const updatedCourses = courses.map((course) => {
        if (String(course.id) !== String(courseId)) {
          return course;
        }

        const completedLessons = Array.isArray(
          course.completedLessons
        )
          ? course.completedLessons
          : [];

        const alreadyCompleted = completedLessons.some(
          (id) => String(id) === String(lessonId)
        );

        if (alreadyCompleted) {
          return course;
        }

        return {
          ...course,
          completedLessons: [
            ...completedLessons,
            lessonId,
          ],
        };
      });

      return {
        ...previous,
        [emailKey]: updatedCourses,
      };
    });
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.some(
      (course) => String(course.id) === String(courseId)
    );
  };

  const getProgress = (courseId, totalLessons) => {
    const validTotal = Number(totalLessons);

    if (!Number.isFinite(validTotal) || validTotal <= 0) {
      return 0;
    }

    const course = enrolledCourses.find(
      (item) => String(item.id) === String(courseId)
    );

    const completedLessons = Array.isArray(
      course?.completedLessons
    )
      ? course.completedLessons.length
      : 0;

    return Math.min(
      100,
      Math.round((completedLessons / validTotal) * 100)
    );
  };

  return (
    <EnrollmentContext.Provider
      value={{
        enrolledCourses,
        enrollCourses,
        markLessonComplete,
        isEnrolled,
        getProgress,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollments() {
  const context = useContext(EnrollmentContext);

  if (!context) {
    throw new Error(
      "useEnrollments must be used inside EnrollmentProvider"
    );
  }

  return context;
}