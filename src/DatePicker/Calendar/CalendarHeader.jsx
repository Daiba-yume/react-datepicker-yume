import "../DatePicker.css";

/**
 * Composant affichant les jours de la semaine dans l’en-tête du calendrier.
 *
 * Props :
 * - locale : chaîne de caractères pour choisir la langue (ex: "fr-FR", "en-US")
 * - weekDaysStyle : styles CSS personnalisés à appliquer aux jours
 */
function CalendarHeader({ locale = "fr-FR", weekDaysStyle = {} }) {
  const daysFR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const daysEN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fry", "Sat"];
  // Choix des jours selon la locale (français par défaut)
  const days = locale.startsWith("fr") ? daysFR : daysEN;
  return (
    <>
      {/* Jours de la semaine */}
      {days.map((day) => (
        <div className="weekDays" key={day} style={weekDaysStyle}>
          {day}
        </div>
      ))}
    </>
  );
}

export default CalendarHeader;
