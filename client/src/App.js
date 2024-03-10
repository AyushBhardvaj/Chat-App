import { CssBaseline } from "@mui/material";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Form from "./pages/Form";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ProtectedRoute } from "./utils/protectedRoute";
import Onboarding from "./pages/Onboarding";

function App() {
  return (
    <div className="bg-[#edf3fc] md:h-screen items-center flex justify-center">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute redirect="/user/sign_in">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/user/sign_in" element={<Form isSignupPage={false} />} />
          <Route path="/user/sign_up" element={<Form isSignupPage={true} />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
