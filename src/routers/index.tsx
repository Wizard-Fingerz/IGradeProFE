import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Layout from "../layouts/Layout";
import LandingPage from "../pages/LandingPage";
import ExaminationPage from "../pages/Examination";
import ResultPage from "../pages/Results";
import StudentPage from "../pages/Students";
import SubjectPage from "../pages/Subjects";
import QuestionPage from "../pages/Question";
import EditExam from "../pages/Examination/components/forms/EditExam";
import CreateExam from "../pages/Examination/components/forms/CreateExam";
import ViewExam from "../pages/Examination/components/forms/ViewExam";
import UploadScriptsByStudent from "../pages/Students/components/forms/UploadScriptsByStudent";
import ViewStudentDetials from "../pages/Students/ViewStudentDetials";
import MarkExamPage from "../pages/MarkExam";
import UploadScriptZip from "../pages/MarkExam/components/UploadScriptZip";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Check token in localStorage when the app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set authentication state
  }, []);

  if (isAuthenticated === null) {
    // Show a loading spinner while checking authentication
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/index" element={<LandingPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={isAuthenticated ? <Dashboard /> : <Navigate to="/index" />} />
            <Route path="exams" element={isAuthenticated ? <ExaminationPage /> : <Navigate to="/index" />} />
            <Route path="subjects" element={isAuthenticated ? <SubjectPage /> : <Navigate to="/index" />} />
            <Route path="students" element={isAuthenticated ? <StudentPage /> : <Navigate to="/index" />} />
            <Route path="questions" element={isAuthenticated ? <QuestionPage /> : <Navigate to="/index" />} />
            <Route path="exams/create-exam" element={isAuthenticated ? <CreateExam /> : <Navigate to="/index" />} />
            <Route path="exams/edit-exam/:id" element={isAuthenticated ? <EditExam /> : <Navigate to="/index" />} />
            <Route path="exams/view-exam/:id" element={isAuthenticated ? <ViewExam /> : <Navigate to="/index" />} />
            <Route path="/students/details/view/:id" element={isAuthenticated ? <ViewStudentDetials /> : <Navigate to="/index" />} />
            <Route path="/students/scripts/upload/:studentId" element={isAuthenticated ? <UploadScriptsByStudent /> : <Navigate to="/index" />} />
            <Route path="marks" element={isAuthenticated ? <MarkExamPage /> : <Navigate to="/index" />} />
            <Route path="marks/upload-zip" element={isAuthenticated ? <UploadScriptZip /> : <Navigate to="/index" />} />
            <Route path="result" element={isAuthenticated ? <ResultPage /> : <Navigate to="/index" />} />
            <Route path="support" element={isAuthenticated ? <ExaminationPage /> : <Navigate to="/index" />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
