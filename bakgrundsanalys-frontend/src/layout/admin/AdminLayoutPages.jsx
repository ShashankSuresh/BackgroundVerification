import React from "react";
import Proptypes from "prop-types";
import Div from "@components/Div";
import AdminSideMenu from "@pages/admin/AdminSideMenu";
import AdminHeader from "@pages/admin/AdminHeader";
import { ADMIN_NAV } from "@utils/constant";
import Logo from "@components/Logo";
import LogoFull from "@assets/logo.png";

const props = {
  sideMenuNavItems: ADMIN_NAV,
  start: (
    <Logo
      display={["flex", "flex", "flex", "none"]}
      logo={LogoFull}
      width={[120, 170, 170, 200]}
      height={[45, 105]}
      pb={[0, 0, 0, 18]}
      pt={[0, 0, 0, 10]}
    />
  ),
};

const AdminLayoutScreens = ({ children }) => (
  <Div display="flex">
    <Div
      width={[1, 1, 1, "192px"]}
      minHeight="100vh"
      minWidth={192}
      display={["none", "none", "none", "block"]}
      boxShadow="0px 4px 30px rgba(0, 0, 0, 0.15)"
    >
      <Div position="fixed">
        <AdminSideMenu />
      </Div>
    </Div>
    <Div width={1}>
      <AdminHeader {...props} />
      <Div m={["5%", "5%", "5%", "32px"]}>{children}</Div>
    </Div>
  </Div>
);

AdminLayoutScreens.propTypes = {
  children: Proptypes.node,
  isAdmin: Proptypes.bool,
};

export default AdminLayoutScreens;
