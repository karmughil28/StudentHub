import { useEffect } from "react";
import { X, Mail, Phone, Heart, GraduationCap, Hash, BookOpen } from "lucide-react";
import { useStudents } from "../context/StudentContext";

export default function StudentModal({ student, onClose }) {
  const { addFavourite, removeFavourite, isFavourite } = useStudents();
  const saved = isFavourite(student.id);
  const initials = student.name.split(" ").map((part) => part[0]).slice(0, 2).join("");

  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="student-modal" role="dialog" aria-modal="true" aria-labelledby="student-modal-title">
        <button className="modal-close icon-button" onClick={onClose} aria-label="Close profile"><X size={20} /></button>
        <div className="modal-cover"><div className="cover-pattern pattern-a" /><div className="cover-pattern pattern-b" /><div className="modal-avatar">{initials}</div></div>
        <div className="modal-content">
          <div className="modal-eyebrow"><span className="status-dot" /> STUDENT PROFILE</div>
          <h2 id="student-modal-title">{student.name}</h2>
          <p className="modal-subtitle">{student.department} · {student.year}</p>
          <p className="student-about">{student.about}</p>
          <div className="profile-details">
            <div><span className="detail-icon"><Hash size={16} /></span><span><small>Roll number</small><strong>{student.rollNumber}</strong></span></div>
            <div><span className="detail-icon"><BookOpen size={16} /></span><span><small>Department</small><strong>{student.department}</strong></span></div>
            <div><span className="detail-icon"><Mail size={16} /></span><span><small>Email address</small><strong>{student.email}</strong></span></div>
            <div><span className="detail-icon"><Phone size={16} /></span><span><small>Phone number</small><strong>{student.phone}</strong></span></div>
          </div>
          <button className={`primary-button modal-fav-button ${saved ? "saved-button" : ""}`} onClick={() => saved ? removeFavourite(student.id) : addFavourite(student)}>
            <Heart size={17} fill={saved ? "currentColor" : "none"} /> {saved ? "Remove from favourites" : "Add to favourites"}
          </button>
          <div className="modal-footnote"><GraduationCap size={16} /> Building a stronger campus community.</div>
        </div>
      </section>
    </div>
  );
}
