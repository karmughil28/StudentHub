import { Heart, ArrowUpRight, Mail } from "lucide-react";
import { useStudents } from "../context/StudentContext";

const avatarColors = ["mint", "lavender", "peach", "blue", "rose"];

export default function StudentCard({ student, onOpen }) {
  const { addFavourite, removeFavourite, isFavourite } = useStudents();
  const saved = isFavourite(student.id);
  const initials = student.name.split(" ").map((part) => part[0]).slice(0, 2).join("");

  function toggleFavourite(event) {
    event.stopPropagation();
    saved ? removeFavourite(student.id) : addFavourite(student);
  }

  return (
    <article className="student-card" onClick={() => onOpen(student)} tabIndex={0}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpen(student); } }}
      aria-label={`View ${student.name}'s profile`}>
      <div className="card-topline">
        <div className={`student-avatar ${avatarColors[student.id % avatarColors.length]}`}>{initials}</div>
        <button className={`heart-button ${saved ? "is-saved" : ""}`} onClick={toggleFavourite} aria-label={saved ? `Remove ${student.name} from favourites` : `Add ${student.name} to favourites`} title={saved ? "Remove from favourites" : "Add to favourites"}>
          <Heart size={19} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="student-name-row">
        <div><h3>{student.name}</h3><p className="roll-number">{student.rollNumber}</p></div>
        <button className="profile-open" onClick={(event) => { event.stopPropagation(); onOpen(student); }} aria-label={`Open ${student.name}'s profile`}><ArrowUpRight size={17} /></button>
      </div>
      <div className="card-tags"><span className={`department-tag tag-${student.department.toLowerCase()}`}>{student.department}</span><span className="year-tag">{student.year}</span></div>
      <div className="card-divider" />
      <div className="card-bottom"><span><Mail size={14} /> Student profile</span><span className="view-label">View details <ArrowUpRight size={13} /></span></div>
      {saved && <div className="saved-ribbon"><Heart size={11} fill="currentColor" /> SAVED</div>}
    </article>
  );
}
