import React from "react";
import Proptypes from "prop-types";
import { addLocale } from "primereact/api";
import Div from "@components/Div";
import Calendar from "@components/Calendar";
import Icon from "@components/Icon";

const UtilCalendar = ({ value }) => {
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevYear = prevMonth === 11 ? year - 1 : year;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = nextMonth === 0 ? year + 1 : year;

  let minDate = new Date();
  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Claro",
  });

  return (
    <Div display={["block", "flex"]} key={value.id} mb={30}>
      <Div flexBasis={"25%"} my={[25, "auto"]}>
        <p>{value.title}</p>
      </Div>
      <Div>
        {value.options.map((obj, index) => (
          <Calendar
            key={index}
            id={`calendar${index}`}
            placeholder={obj.label}
            showIcon
            icon={<Icon name="calendar" />}
            value={obj.value}
            onChange={obj.onClick(value.type, obj.id)}
            readOnlyInput
            width={[1, 1 / 2.2]}
            mr={[0, 3]}
            mb={[3, 0]}
          />
        ))}
      </Div>
    </Div>
  );
};

UtilCalendar.propTypes = {
  value: Proptypes.object,
};

export default UtilCalendar;
