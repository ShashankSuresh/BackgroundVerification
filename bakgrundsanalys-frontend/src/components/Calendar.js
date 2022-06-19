import React from "react";
import styled from "styled-components";
import { Calendar as PRCalendar } from "primereact/calendar";
import {
  compose,
  width,
  space,
  position,
  layout,
  flexbox,
  typography,
} from "styled-system";

const StyledCalendar = styled(PRCalendar)`
  ${compose(compose, width, space, position, layout, flexbox, typography)};
`;

const Calendar = (props) => <StyledCalendar {...props} />;

export default Calendar;
