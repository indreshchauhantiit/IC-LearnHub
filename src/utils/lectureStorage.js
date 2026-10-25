
const LECTURE_STORAGE_KEY = "lms-lecture-drafts";

export function getInstructorLectures(courseId) {
  try {
    const savedLectures = localStorage.getItem(LECTURE_STORAGE_KEY);
    const lectures = savedLectures ? JSON.parse(savedLectures) : [];

    if (!Array.isArray(lectures)) {
      return [];
    }

    return lectures
      .filter(
        (lecture) => String(lecture.courseId) === String(courseId)
      )
      .sort(
        (a, b) =>
          new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
      );
  } catch (error) {
    console.error("Unable to read saved lectures:", error);
    return [];
  }
}

export function getAllInstructorLectures() {
  try {
    const savedLectures = localStorage.getItem(LECTURE_STORAGE_KEY);
    const lectures = savedLectures ? JSON.parse(savedLectures) : [];

    return Array.isArray(lectures) ? lectures : [];
  } catch (error) {
    console.error("Unable to read saved lectures:", error);
    return [];
  }
}
