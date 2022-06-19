import React from "react";
import styled from "styled-components";
import Proptypes from "prop-types";
import Div from "@components/Div";
import UserHeader from "@pages/user/UserHeader";
import Footer from "@components/Footer";
import { HEADER_NAV } from "@utils/constant";
import ScrollToTop from "@utils/ScrollToTop";

export const StyledDiv = styled(Div)`
  display: flex;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
`;

export const GuestLayout = ({ children }) => {
  const props = {
    navItems: HEADER_NAV,
    sideMenuNavItems: HEADER_NAV,
  };
  return (
    <Div
      display="flex"
      alignItems="center"
      flexDirection="column"
      alignContent="space-between"
      justifyContent="space-between"
      minHeight={"100vh"}
    >
      <UserHeader {...props} />
      <ScrollToTop>{children}</ScrollToTop>
      <Footer />
    </Div>
  );
};

GuestLayout.propTypes = {
  children: Proptypes.node,
};

export default GuestLayout;
