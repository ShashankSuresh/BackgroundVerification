import React from "react";
import { useLocation } from "react-router-dom";
import Proptypes from "prop-types";
import styled from "styled-components";
import {
  space,
  layout,
  flexbox,
  position,
  color,
  typography,
} from "styled-system";
import RoutesList from "@shared/RoutesList";
import { APPLICATION_NAME, TITLE_DIVIDER } from "@utils/constant";

const StyledSection = styled("section")(
  layout,
  space,
  flexbox,
  position,
  color,
  typography
);

const Section = (props) => {
  const { className, children } = props;
  const location = useLocation();
  const route = RoutesList.find((obj) => obj.url.includes(location.pathname));
  if (route) {
    document.title = APPLICATION_NAME + TITLE_DIVIDER + route.title;
  }

  return (
    <StyledSection
      m={"0 auto"}
      width={1}
      px={[4, 5, 5, "48px"]}
      py={[4, 5, 5, "48px"]}
      className={className}
      {...props}
    >
      {children}
    </StyledSection>
  );
};

Section.propTypes = {
  className: Proptypes.string.isRequired,
  children: Proptypes.node.isRequired,
};

export default Section;
