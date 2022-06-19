import React from "react";
import { useIntl } from "react-intl";
import Proptypes from "prop-types";
import { useSelector } from "react-redux";
import Div from "@components/Div";
import AdminSideMenu from "@pages/admin/AdminSideMenu";
import AdminHeader from "@pages/admin/AdminHeader";
import { ADMIN_NAV } from "@utils/constant";
import Logo from "@components/Logo";
import LogoFull from "@assets/logo.png";
import FooterLayout from "./FooterLayout";
import { LOGIN } from "@utils/constant";

const AdminLayout = ({ children }) => {
  const { messages } = useIntl();
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const { permissions = {} } = userInfo;
  const availablePages = Object.keys(permissions).map((obj) => obj);

  const menuItems = ADMIN_NAV.filter((obj) =>
    availablePages.includes(obj.value)
  );
  const props = {
    sideMenuNavItems: menuItems,
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
  return (
    <Div display="flex">
      <Div
        width={[1, 1, 1, "192px"]}
        minHeight="100vh"
        minWidth={192}
        display={["none", "none", "none", "block"]}
        boxShadow="0px 4px 30px rgba(0, 0, 0, 0.15)"
      >
        <Div
          position="fixed"
          justifyContent="space-between"
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <AdminSideMenu />
          <FooterLayout
            buttonLabel={messages.label_log_out}
            redirectTo={LOGIN}
          />
        </Div>
      </Div>
      <Div width={1}>
        <AdminHeader {...props} />
        <Div m={["5%", "5%", "5%", "32px"]}>{children}</Div>
      </Div>
    </Div>
  );
};

AdminLayout.propTypes = {
  children: Proptypes.node,
  isAdmin: Proptypes.bool,
};

export default AdminLayout;
