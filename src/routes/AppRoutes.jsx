import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicLayout from "../layouts/PublicLayout";

// Public Pages
import Home from "../pages/public/Home";
import CourseCatalog from "../pages/public/CourseCatalog";
import CourseDetail from "../pages/public/CourseDetail";
import MCQ from "../pages/MCQ/MCQ";
import JavaQuestions from "../pages/java/JavaQuestions";
import JavaQuestionDetail from "../pages/java/JavaQuestionDetail";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Student Pages
import StudentDashboard from "../pages/student/StudentDashboard";
import CoursePlayer from "../pages/student/CoursePlayer";
import CartCheckout from "../pages/student/CartCheckout";
import StudentProfile from "../pages/student/StudentProfile";

// Instructor Pages
import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import InstructorCourses from "../pages/instructor/InstructorCourses";
import CourseBuilder from "../pages/instructor/CourseBuilder";
import LectureUpload from "../pages/instructor/LectureUpload";

// Error Page
import NotFound from "../pages/errors/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />

        <Route
          path="courses"
          element={<CourseCatalog />}
        />

        <Route
          path="courses/:courseId"
          element={<CourseDetail />}
        />

        {/* Free Java questions and answers */}
        <Route path="java-questions" element={<JavaQuestions />} />
        <Route path="java-questions/:slug" element={<JavaQuestionDetail />} />

        {/* MCQ Page */}
        <Route
          path="mcq"
          element={<MCQ />}
        />
      </Route>

      {/* Authentication Pages */}
      <Route
        path="login"
        element={<Login />}
      />

      <Route
        path="register"
        element={<Register />}
      />

      {/* Student Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route
          path="student/dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="student/course/:courseId"
          element={<CoursePlayer />}
        />

        <Route
          path="student/cart"
          element={<CartCheckout />}
        />

        <Route
          path="student/profile"
          element={<StudentProfile />}
        />
      </Route>

      {/* Instructor Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["instructor"]} />}>
        <Route
          path="instructor/dashboard"
          element={<InstructorDashboard />}
        />

        <Route
          path="instructor/courses"
          element={<InstructorCourses />}
        />

        <Route
          path="instructor/courses/manage"
          element={<CourseBuilder />}
        />

        <Route
          path="instructor/courses/:courseId/lectures"
          element={<LectureUpload />}
        />
      </Route>

      {/* 404 Page */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default AppRoutes;