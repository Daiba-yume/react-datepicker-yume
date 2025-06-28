/**
 * Composant affichant la grille des jours pour un mois donné.
 *
 * Props :
 * - date : Date utilisée pour afficher le mois et l’année
 * - onSelectDate : fonction appelée quand une date valide est sélectionnée
 * - daysColor : couleur des jours du mois courant
 */
function CalendarGrid({ date, onSelectDate, daysColor }) {
  const month = date.getMonth();
  const year = date.getFullYear();
  // Nombre de jours dans le mois courant et précédent
  const totalDays = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Index du 1er jour du mois (dimanche=0)
  const firstDay = new Date(year, month, 1).getDay();
  const daysBefore = firstDay === 0 ? 6 : firstDay - 1;

  // Génère 42 jours à afficher (jours mois précédent + courant + suivant)
  const generateDays = () => {
    const days = [];
    // jours du mois précédent
    for (let i = daysInPrevMonth - daysBefore + 1; i <= daysInPrevMonth; i++) {
      days.push({ day: i, currentMonth: false });
    }
    // jours du mois courant
    for (let i = 1; i <= totalDays; i++) {
      days.push({ day: i, currentMonth: true });
    }
    // Ajoute les jours du mois suivant en fin de grille (pour compléter 42 cases)
    const totalCells = 42;
    const daysAfter = totalCells - days.length;
    // jours du mois suivant
    for (let i = 1; i <= daysAfter; i++) {
      days.push({ day: i, currentMonth: false });
    }
    return days;
  };

  const daysInMonth = generateDays();

  return (
    <>
      {/* Jours du mois */}
      {daysInMonth.map(({ day, currentMonth }, index) => {
        // Style simple : jours du mois courant en couleur, autres gris
        const style = {
          fontSize: "12px",
          fontWeight: "bold",
          color: currentMonth ? daysColor : "#aaa",
          opacity: currentMonth ? 1 : 0.4,
          cursor: currentMonth ? "pointer" : "default",
        };
        // Permet la sélection avec la touche Enter uniquement pour les jours du mois courant
        const handleKeyDown = (e) => {
          if (e.key === "Enter" && currentMonth) {
            onSelectDate(new Date(year, month, day));
          }
        };
        return (
          <div
            key={index}
            role="button"
            tabIndex={currentMonth ? 0 : -1}
            aria-label={`Jour ${day}${
              currentMonth ? "du mois courant" : "hors mois courant"
            }`}
            aria-selected={currentMonth}
            onClick={() => {
              if (currentMonth) {
                onSelectDate(new Date(year, month, day));
              }
            }}
            onKeyDown={handleKeyDown}
            style={style}
          >
            {day}
          </div>
        );
      })}
    </>
  );
}

export default CalendarGrid;
