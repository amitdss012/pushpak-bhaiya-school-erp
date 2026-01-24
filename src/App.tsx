import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ViewStudents from "./pages/student/ViewStudents";
import AddStudent from "./pages/student/AddStudent";
import FeeCollection from "./pages/fee/FeeCollection";
import ViewCourses from "./pages/course/ViewCourses";
import ExamSchedule from "./pages/exam/ExamSchedule";
import IDCardTemplate from "./pages/cards/IDCardTemplate";
import GeneralSettings from "./pages/settings/GeneralSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Index />} />
          
          {/* Student Management */}
          <Route path="/student/view" element={<ViewStudents />} />
          <Route path="/student/add" element={<AddStudent />} />
          
          {/* Fee Management */}
          <Route path="/fee/collection" element={<FeeCollection />} />
          
          {/* Course Management */}
          <Route path="/course/view" element={<ViewCourses />} />
          
          {/* Exam Management */}
          <Route path="/exam/schedule" element={<ExamSchedule />} />
          
          {/* Cards */}
          <Route path="/cards/id-template" element={<IDCardTemplate />} />
          
          {/* Settings */}
          <Route path="/settings/general" element={<GeneralSettings />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
