import React from "react";
import { useSelector } from "react-redux";
import SideMenuContent from "@components/SideMenuContent";
import { ADMIN_NAV } from "@utils/constant";
import Div from "@components/Div";
import Logo from "@components/Logo";
import LogoFull from "@assets/logo.png";

const LogoComponent = () => (
  <Div mt={3} mb={4}>
    <Logo
      display="block"
      logo={LogoFull}
      width={140}
      height={"auto"}
      mx={3}
      py={4}
    />
  </Div>
);

const AdminSideMenu = () => {
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const { permissions = {} } = userInfo;
  const availablePages = Object.keys(permissions).map((obj) => obj);

  const menuItems = ADMIN_NAV.filter((obj) =>
    availablePages.includes(obj.value)
  );

  const props = {
    Component: LogoComponent,
    navItems: menuItems,
  };
  return <SideMenuContent {...props} />;
};

export default AdminSideMenu;
