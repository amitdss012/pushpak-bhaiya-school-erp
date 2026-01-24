import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Reception
import VisitEnquiry from "./pages/reception/VisitEnquiry";
import VisitorsInformation from "./pages/reception/VisitorsInformation";
import ItemDispatch from "./pages/reception/ItemDispatch";
import ItemReceive from "./pages/reception/ItemReceive";

// Student Management
import ViewStudents from "./pages/student/ViewStudents";
import AddStudent from "./pages/student/AddStudent";

// Fee Management
import FeeCollection from "./pages/fee/FeeCollection";

// Course Management
import ViewCourses from "./pages/course/ViewCourses";

// Exam Management
import ExamSchedule from "./pages/exam/ExamSchedule";

// Cards
import IDCardTemplate from "./pages/cards/IDCardTemplate";

// Settings
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
          
          {/* Reception Management */}
          <Route path="/reception/enquiry" element={<VisitEnquiry />} />
          <Route path="/reception/visitors" element={<VisitorsInformation />} />
          <Route path="/reception/dispatch" element={<ItemDispatch />} />
          <Route path="/reception/receive" element={<ItemReceive />} />
          
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
