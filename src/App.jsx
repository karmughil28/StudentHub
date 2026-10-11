import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StudentModal from "./components/StudentModal";
import StudentList from "./pages/StudentList";
import Favourites from "./pages/Favourites";

export default function App() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark");
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className={`app-shell theme-${theme}`}>
      <Header
        search={search}
        onSearchChange={setSearch}
        theme={theme}
        onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")}
      />
      <div className="app-layout">
        <Sidebar />
        <main className="main-panel">
          <Routes>
            <Route
              path="/"
              element={<StudentList search={search} onOpenStudent={setSelectedStudent} />}
            />
            <Route
              path="/favourites"
              element={<Favourites search={search} onOpenStudent={setSelectedStudent} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <footer className="main-footer">
            <span>StudentHub <span className="footer-dot">●</span> Made for meaningful connections</span>
            <span>Student Directory · 2026</span>
          </footer>
        </main>
      </div>
      {selectedStudent && (
        <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  );
}
