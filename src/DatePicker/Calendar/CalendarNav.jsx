import "../DatePicker.css";
import { TbArrowLeftToArc, TbArrowRightToArc } from "react-icons/tb";

/**
 * Composant de navigation du calendrier.
 * Permet de changer le mois et l'année affichés via des boutons et des select.
 *
 * Props :
 * - date : objet Date actuel affiché
 * - setDate : fonction pour modifier la date
 * - navLabelStyle : style CSS optionnel pour le select mois
 * - selectStyle : style CSS optionnel pour le select année
 */
function CalendarNav({
  date,
  setDate,
  navLabelStyle = {},
  selectStyle = {},
  locale = "fr-FR",
}) {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  // Génère dynamiquement les noms des mois selon la locale reçue
  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date(2025, i))
  );
  // Fonction pour reculer d’un mois
  const goToPreviousMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
  };
  // Fonction pour avancer d’un mois
  const goToNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
  };
  // Génère la liste des années pour le select (60 ans en arrière)
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= currentYear - 60; y--) {
    years.push(y);
  }

  return (
    <div className="navStyle">
      {/* Bouton Mois précédent, accessible au clavier */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Mois précédent"
        onClick={goToPreviousMonth}
        onKeyDown={(e) => {
          if (e.key === "Enter") goToPreviousMonth();
        }}
      >
        <TbArrowLeftToArc size={20} />
      </div>
      {/* Select pour choisir le mois */}
      <select
        className="navLabelStyle"
        style={navLabelStyle}
        aria-label="Sélectionner le mois"
        value={monthIndex}
        onChange={(e) => {
          const newMonth = Number(e.target.value);
          const newDate = new Date(date);
          newDate.setMonth(newMonth);
          setDate(newDate);
        }}
      >
        {monthNames.map((m, index) => (
          <option key={index} value={index}>
            {m}
          </option>
        ))}
      </select>
      {/* Select pour choisir l'année */}
      <select
        className="selectStyle"
        style={selectStyle}
        aria-label="Sélectionner l'année"
        value={year}
        onChange={(e) => {
          const newYear = Number(e.target.value);
          const newDate = new Date(date);
          newDate.setFullYear(newYear);
          setDate(newDate);
        }}
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      {/* Bouton Mois suivant, accessible au clavier */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Mois suivant"
        onClick={goToNextMonth}
        onKeyDown={(e) => {
          if (e.key === "Enter") goToNextMonth();
        }}
      >
        <TbArrowRightToArc size={20} />
      </div>
    </div>
  );
}

export default CalendarNav;
