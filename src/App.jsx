import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/home" element={<AdminPage />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
