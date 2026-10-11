import { createContext, useCallback, useContext, useMemo, useState } from "react";

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = useCallback((student) => {
    setFavourites((current) => current.some((item) => item.id === student.id) ? current : [...current, student]);
  }, []);

  const removeFavourite = useCallback((studentId) => {
    setFavourites((current) => current.filter((student) => student.id !== studentId));
  }, []);

  const isFavourite = useCallback((studentId) => favourites.some((student) => student.id === studentId), [favourites]);

  const value = useMemo(() => ({
    favourites,
    addFavourite,
    removeFavourite,
    isFavourite,
  }), [favourites, addFavourite, removeFavourite, isFavourite]);

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) throw new Error("useStudents must be used inside StudentProvider");
  return context;
}
