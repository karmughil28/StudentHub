import { GraduationCap, Search, Sun, Moon, X } from "lucide-react";

export default function Header({ search, onSearchChange, theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="StudentHub home">
        <span className="brand-icon"><GraduationCap size={23} strokeWidth={2.2} /></span>
        <span className="brand-name"><span>Student</span><b>Hub</b></span>
      </a>
      <label className="search-box">
        <Search size={18} aria-hidden="true" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search students by name or roll number..."
          aria-label="Search students by name, roll number, or department"
        />
        {search && <button className="clear-search" onClick={() => onSearchChange("")} aria-label="Clear search"><X size={16} /></button>}
        <kbd>⌘ K</kbd>
      </label>
      <div className="topbar-actions">
        <button className="icon-button theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} shell`}>
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        
      </div>
    </header>
  );
}
