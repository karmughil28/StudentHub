import { GraduationCap, Heart, Users, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useStudents } from "../context/StudentContext";

export default function Sidebar() {
  const { favourites } = useStudents();

  return (
    <aside className="sidebar">
      <div className="sidebar-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Main navigation">
        <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <Users size={18} /><span>Student List</span>
        </NavLink>
        <NavLink to="/favourites" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <Heart size={18} /><span>Favourite Students</span><span className="nav-count">{favourites.length}</span>
        </NavLink>
      </nav>
      <div className="sidebar-spacer" />
      <div className="motivation-card">
        <div className="motivation-icon"><Sparkles size={17} /></div>
        <p>Small steps build big dreams.</p>
        <span>Keep discovering your community.</span>
        <div className="motivation-orb orb-one" />
        <div className="motivation-orb orb-two" />
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-mini-logo"><GraduationCap size={17} /></div>
        <div><strong>StudentHub</strong><span>Campus community</span></div>
      </div>
    </aside>
  );
}
