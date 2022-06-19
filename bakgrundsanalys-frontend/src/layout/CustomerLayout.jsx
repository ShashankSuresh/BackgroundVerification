import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Proptypes from "prop-types";
import Div from "@components/Div";
import UserHeader from "@pages/user/UserHeader";
import Footer from "@components/Footer";
import { H1 } from "@components/Heading";
import SideMenuContent from "@components/SideMenuContent";
import { HEADER_NAV, MYACCOUNTS_NAV } from "@utils/constant";
import FooterLayout from "./FooterLayout";
import { INDIVIDUAL } from "@utils/constant";

export const StyledDiv = styled(Div)`
  display: flex;
`;

export const CustomerLayout = ({ children }) => {
  const { messages } = useIntl();
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const { customer = { type: INDIVIDUAL }, name, permissions = [] } = userInfo;
  const myAccountsNav = MYACCOUNTS_NAV.filter((i) => {
    if (customer.type === INDIVIDUAL) {
      return i.label !== messages.label_company_info.toUpperCase();
    }
    return i;
  });

  const availablePages = Object.keys(permissions).map((obj) => obj);

  const menuItems = myAccountsNav.filter(
    (obj) => availablePages.includes(obj.value) || obj.value === "user-info"
  );

  const myAccountGrid = () => {
    const props = {
      navItems: menuItems,
    };
    return (
      <StyledDiv
        m={["4% 0", "4% 0", "4% 0", "30px 10% 50px"]}
        p={["5%", "5%", "5%", 0]}
        boxShadow={"0px 4px 30px rgba(0, 0, 0, 0.15)"}
      >
        <Div
          display={["none", "none", "none", "flex"]}
          flexDirection="column"
          backgroundColor={"rgba(var(--grey-light-rgba), .4)"}
          boxShadow={"0px 0px 40px rgba(0, 0, 0, 0.06)"}
          justifyContent="space-between"
        >
          <SideMenuContent {...props} />
          <FooterLayout
            buttonLabel={messages.label_log_out}
            redirectTo="LOGIN"
          />
        </Div>
        <Div p={[0, 0, 0, 4]} width={1}>
          {children}
        </Div>
      </StyledDiv>
    );
  };

  const props = {
    navItems: HEADER_NAV,
    sideMenuNavItems: [...HEADER_NAV, ...menuItems],
  };

  return (
    <Div
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      height="100vh"
    >
      <Div>
        <UserHeader {...props} />
        <H1 mx={["5%", "5%", "5%", "10%"]} mt={[24, 50]}>
          {messages.header_myProfile}: {name}
        </H1>
        {myAccountGrid()}
      </Div>
      <Footer />
    </Div>
  );
};

CustomerLayout.propTypes = {
  children: Proptypes.node,
};

export default CustomerLayout;
