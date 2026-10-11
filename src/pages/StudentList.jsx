import { useMemo, useState } from "react";
import { Users, SlidersHorizontal, ArrowDownAZ, Hash, SearchX, Sparkles } from "lucide-react";
import StudentCard from "../components/StudentCard";
import { students, departments } from "../data/students";

export default function StudentList({ search, onOpenStudent }) {
  const [department, setDepartment] = useState("All Departments");
  const [sort, setSort] = useState("name");

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    return students.filter((student) => {
      const matchesDepartment = department === "All Departments" || student.department === department;
      const matchesSearch = !query || [student.name, student.rollNumber, student.department, student.year].some((value) => value.toLowerCase().includes(query));
      return matchesDepartment && matchesSearch;
    }).sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : a.rollNumber.localeCompare(b.rollNumber));
  }, [search, department, sort]);

  return (
    <section className="page-content">
      <div className="eyebrow"><span className="eyebrow-line" /> EXPLORE <span>·</span> DISCOVER <span>·</span> SAVE</div>
      <div className="page-heading-row">
        <div><h1>Student List<span className="heading-period">.</span></h1><p className="page-subtitle">Browse the students and add them to your favourite list.</p></div>
        <div className="stat-card"><div className="stat-icon"><Users size={19} /></div><div><span>Total Students</span><strong>{students.length.toString().padStart(2, "0")}</strong></div><span className="stat-trend">Directory</span></div>
      </div>
      <div className="section-rule" />
      <div className="toolbar">
        <div className="toolbar-left">
          <label className="select-wrap"><SlidersHorizontal size={15} /><select value={department} onChange={(event) => setDepartment(event.target.value)} aria-label="Filter by department">{departments.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="select-wrap"><ArrowDownAZ size={16} /><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort students"><option value="name">Name A–Z</option><option value="roll">Roll Number</option></select></label>
        </div>
        <span className="result-count"><strong>{filteredStudents.length}</strong> {filteredStudents.length === 1 ? "student" : "students"} found</span>
      </div>
      {filteredStudents.length ? (
        <div className="student-grid">{filteredStudents.map((student) => <StudentCard key={student.id} student={student} onOpen={onOpenStudent} />)}</div>
      ) : (
        <div className="empty-search"><div className="empty-search-icon"><SearchX size={25} /></div><h3>No students found</h3><p>Try another name, roll number, or department.</p><button className="text-button" onClick={() => { setDepartment("All Departments"); }}>Reset department filter</button></div>
      )}
      <div className="inspiration-strip"><div className="inspiration-icon"><Sparkles size={18} /></div><p><strong>Great connections start with a favourite.</strong><span>Keep exploring — your next collaborator could be here.</span></p><span className="strip-decoration">✳</span></div>
    </section>
  );
}
