import React from "react";
import Proptypes from "prop-types";
import Container from "@components/Container";
import Section from "@components/Section";
import AdminHeader from "@pages/admin/AdminHeader";
import Footer from "@components/Footer";
import Logo from "@components/Logo";
import Div from "@components/Div";
import LogoFull from "@assets/logo.png";
import { HEADER_ADMIN_NAV } from "@utils/constant";

const props = {
  navItems: HEADER_ADMIN_NAV,
  start: (
    <Logo
      logo={LogoFull}
      width={[120, 170, 200]}
      height={[45, 105]}
      pb={[0, 18]}
      pt={[0, 10]}
    />
  ),
};

const AdminGuestLayout = ({ children }) => (
  <Div
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    minHeight="100vh"
  >
    <AdminHeader {...props} />
    <Section>
      <Container>{children}</Container>
    </Section>
    <Footer />
  </Div>
);

AdminGuestLayout.propTypes = {
  children: Proptypes.node,
  isAdmin: Proptypes.bool,
};

export default AdminGuestLayout;
