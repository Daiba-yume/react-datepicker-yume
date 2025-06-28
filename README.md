# React-datepicker-yume

A simple and customizable React DatePicker component.

## Installation

```bash
npm install react-datepicker-yume
# ou
yarn add react-datepicker-yume
```

### Utilisation

```jsx
import { useState } from "react";
import DatePicker from "react-datepicker-yume";
import "react-datepicker-yume/dist/DatePicker.css";

function MyComponent() {
  const [selectDate, setSelectDate] = useState(null);

  return (
    <DatePicker
      loacale="fr-FR"
      minAge={18} // optional:  minimum age for validation
      navLabelStyle={{}} // style for navigation labels
      selectStyle={{}} // style for selected day
      weekDaysStyle={{}} // style for week day headers
      daysColor="#yourColor" // color for day numbers
      value={selectDate}
      onChange={setSelectDate}
      required
    />
  );
}

export default MyComponent;
```

### Props

| Prop            | Type           | Default       | Description                                    |
| --------------- | -------------- | ------------- | ---------------------------------------------- |
| `minAge`        | number         | `null`        | Minimum age to allow selecting a date          |
| `navLabelStyle` | object         | `{}`          | CSS styles applied to navigation labels        |
| `selectStyle`   | object         | `{}`          | CSS styles applied to the selected date        |
| `weekDaysStyle` | object         | `{}`          | CSS styles applied for the weekday headers     |
| `daysColor`     | string         | `"yourColor"` | Color for the day numbers                      |
| `value`         | date or string | `""`          | The date shown in the input field              |
| `onChange`      | function       | `null`        | Function called when the date is changed       |
| `locale`        | string         | `"fr-FR"`     | Change the localisation (ex: "fr-FR", "en-US") |
| `required`      | boolean        | `false`       | Makes the date field required to continue      |

### Auteur

Daïba Yume :purple_heart:
