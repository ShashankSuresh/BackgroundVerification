import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components";
import { space, layout, flexbox } from "styled-system";

const StyledImg = styled("img")(layout, space, flexbox);

const Logo = ({ logo, ...props }) => {
  return <StyledImg src={logo} alt="logo" {...props} />;
};

Logo.propTypes = {
  logo: Proptypes.string,
};

export default Logo;
