import { useState, useEffect } from "react";
import CalendarHeader from "./Calendar/CalendarHeader";
import CalendarGrid from "./Calendar/CalendarGrid";
import "./DatePicker.css";
import CalendarNav from "./Calendar/CalendarNav";
/**
 * Composant DatePicker personnalisé.
 * Permet de sélectionner une date via un calendrier affiché au clic sur l'input.
 *
 * Props :
 * - minAge : (number) âge minimum requis (ex : 18)
 * - value : (Date|string) valeur initiale
 * - onChange : (function) callback appelée avec la nouvelle date sélectionnée
 * - locale : (string) format local de date (par défaut "fr-FR")
 * - navLabelStyle, selectStyle, weekDaysStyle, daysColor : styles personnalisables
 */

function DatePicker({
  minAge = null,
  value = "",
  onChange = () => {},
  locale = "fr-FR",
  navLabelStyle = {},
  selectStyle = {},
  weekDaysStyle = {},
  daysColor = "#627031",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentdate, setCurrentDate] = useState(new Date());
  const [inputValue, setInputValue] = useState("");

  // Calcul de la date max autorisée selon l'âge minimum
  const minDate =
    minAge !== null
      ? new Date(new Date().setFullYear(new Date().getFullYear() - minAge))
      : null;

  // Met à jour la date affichée dans l’input quand la valeur ou la locale change
  useEffect(() => {
    if (value instanceof Date) {
      setInputValue(value.toLocaleDateString(locale));
      setCurrentDate(value);
    } else {
      setInputValue(value || "");
    }
  }, [value, locale]);

  // Ferme le datepicker si on clique en dehors de la div .datePickerContainer
  useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest(".datePickerContainer")) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen]);

  // Fonction appelée quand on sélectionne une date dans le calendrier
  const handleSelectDate = (date) => {
    if (minDate && date > minDate) {
      alert(`Vous devez avoir au moins ${minAge} ans.`);
      return;
    }
    setCurrentDate(date);
    setInputValue(date.toLocaleDateString(locale));
    setIsOpen(false);
    onChange(date);
  };

  return (
    <>
      <div className="datePickerContainer">
        {/* Champ input affichant la date sélectionnée */}
        <input
          id="inputCalendar"
          className="inputCalendar"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value), onChange(e.target.value);
          }}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          placeholder={locale === "fr-FR" ? "jj/mm/aaaa" : "mm/dd/yyyy"}
          readOnly
        />
        {/* Affichage du calendrier si ouvert */}
        {isOpen && (
          <div className="calendarContainer">
            {/* Navigation mois / année */}
            <CalendarNav
              date={currentdate}
              setDate={setCurrentDate}
              navLabelStyle={navLabelStyle}
              selectStyle={selectStyle}
              locale={locale}
            />
            {/* Grille du calendrier */}
            <div className="calendarGrid">
              <CalendarHeader locale={locale} weekDaysStyle={weekDaysStyle} />
              <CalendarGrid
                locale={locale}
                date={currentdate}
                onSelectDate={handleSelectDate}
                daysColor={daysColor}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DatePicker;
