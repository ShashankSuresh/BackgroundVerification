import React from "react";
import Proptypes from "prop-types";
import {
  Accordion as PRAccordion,
  AccordionTab as PRAccordionTab,
} from "primereact/accordion";

const Accordion = ({ content, activeIndex }) => {
  return (
    <PRAccordion activeIndex={activeIndex}>
      {content.map((value, index) => (
        <PRAccordionTab key={index} header={value.title}>
          {value.content}
        </PRAccordionTab>
      ))}
    </PRAccordion>
  );
};

Accordion.propTypes = {
  content: Proptypes.array.isRequired,
  activeIndex: Proptypes.number,
};

export default Accordion;
