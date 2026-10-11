import { Heart, SearchX, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useStudents } from "../context/StudentContext";
import StudentCard from "../components/StudentCard";

export default function Favourites({ search, onOpenStudent }) {
  const { favourites } = useStudents();
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return favourites.filter((student) => !query || [student.name, student.rollNumber, student.department, student.year].some((value) => value.toLowerCase().includes(query)));
  }, [favourites, search]);

  return (
    <section className="page-content">
      <div className="eyebrow"><span className="eyebrow-line" /> YOUR PEOPLE <span>·</span> YOUR COMMUNITY</div>
      <div className="page-heading-row">
        <div><h1>Favourite Students<span className="heading-period">.</span></h1><p className="page-subtitle">A little collection of people worth remembering.</p></div>
        <div className="stat-card"><div className="stat-icon favourite-stat-icon"><Heart size={19} /></div><div><span>Total Favourites</span><strong>{favourites.length.toString().padStart(2, "0")}</strong></div><span className="stat-trend">Your list</span></div>
      </div>
      <div className="section-rule" />
      {favourites.length === 0 ? (
        <div className="favourites-empty">
          <div className="empty-heart-scene"><span className="orbit orbit-a" /><span className="orbit orbit-b" /><span className="orbit-dot dot-a" /><span className="orbit-dot dot-b" /><div className="empty-heart"><Heart size={34} /></div></div>
          <div className="eyebrow centered-eyebrow">A LITTLE SPACE TO GROW</div>
          <h2>No favourite students added yet</h2>
          <p>Save the students you like and they'll appear here, ready whenever you need them.</p>
          <Link to="/" className="primary-button"><Users size={17} /> Explore Students</Link>
          <div className="empty-note"><Sparkles size={14} /> Every great connection starts somewhere.</div>
        </div>
      ) : filtered.length ? (
        <>
          <div className="toolbar"><span className="collection-label"><Heart size={15} fill="currentColor" /> YOUR COLLECTION</span><span className="result-count"><strong>{filtered.length}</strong> {filtered.length === 1 ? "student" : "students"}</span></div>
          <div className="student-grid">{filtered.map((student) => <StudentCard key={student.id} student={student} onOpen={onOpenStudent} />)}</div>
        </>
      ) : (
        <div className="empty-search"><div className="empty-search-icon"><SearchX size={25} /></div><h3>No matching favourites</h3><p>Try a different search term to find someone in your list.</p></div>
      )}
    </section>
  );
}
