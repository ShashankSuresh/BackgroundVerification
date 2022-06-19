import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { default as Div } from "@components/Div";
import Logo from "@components/Logo";
import LogoFull from "@assets/logo.png";
import { MyProfileButton } from "@components/Button";
import Icon from "@components/Icon";
import Link from "@components/Link";
import Span from "@components/Span";
import Sidebar from "@components/Sidebar";
import SideMenu from "@components/SideMenu";
import SideMenuContent from "@components/SideMenuContent";
import useHistory from "@utils/useHistory";
import FooterLayout from "@src/layout/FooterLayout";
import { H3 } from "@components/Heading";
import { LOGIN } from "@utils/constant";
import { isAuthenticated, getRedirectPage } from "@utils/utils";

const UserHeader = (props) => {
  const { navItems = [], sideMenuNavItems } = props;
  const history = useHistory();
  const { messages } = useIntl();
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const isAuthenticatedFlag = isAuthenticated();

  const isLoggedIn = localStorage.getItem("token");

  const redirectToLogin = () => {
    if (!isAuthenticatedFlag || !userInfo.name) {
      localStorage.clear();
      history.push(LOGIN);
    } else {
      const redirectPage = getRedirectPage(userInfo);
      return history.push(redirectPage);
    }
  };

  const MyProfileButtonProps = {
    label: messages.my_profile,
    onClick: redirectToLogin,
    icon: <Icon name="avatar" />,
  };

  const WebSideBar = () => {
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const props = {
      navItems: sideMenuNavItems,
    };
    return (
      <>
        <Link
          label={messages.header_menu}
          onClick={() => setVisibleFullScreen(true)}
          darkblue
          variant="primary"
          flexDirection={"row-reverse !important"}
          display={["flex", "flex", "flex", "none"]}
        >
          <Icon name="hamburger" pr={2} />
        </Link>
        <Sidebar
          visible={visibleFullScreen}
          fullScreen
          icons={
            <H3 mx={"auto"} pl={30}>
              {messages.header_menu}
            </H3>
          }
          onHide={() => setVisibleFullScreen(false)}
        >
          <Div
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <Div>
              <SideMenuContent {...props} />
              <Link
                label={messages.header_myProfile}
                variant="secondary"
                onClick={redirectToLogin}
                iconPos="left"
                display="flex"
                justifyContent="center"
                fontSize={"var(--fs-h4)"}
                mt={12}
              >
                <Icon name="avatar" mr={2} />
              </Link>
            </Div>
            {isLoggedIn && (
              <FooterLayout
                buttonLabel={
                  <Span semibold info>
                    {messages.label_log_out}
                  </Span>
                }
                redirectTo={LOGIN}
              />
            )}
          </Div>
        </Sidebar>
      </>
    );
  };

  const start = (
    <>
      <Logo logo={LogoFull} width="auto" maxHeight="60px" />
      <WebSideBar />
    </>
  );

  const end = (
    <Div
      display={["none", "none", "flex"]}
      width={1}
      backgroundColor={"rgba(var(--grey-lightest-rgba), .3)"}
    >
      <MyProfileButton
        {...MyProfileButtonProps}
        px={[0, 0, 3, 4]}
        pt={70}
        pb={46}
        display={["none", "unset"]}
      />
    </Div>
  );

  return (
    <SideMenu model={navItems} start={start} end={end} width={[1, 1, 1]} />
  );
};

UserHeader.propTypes = {
  config: PropTypes.object,
  navItems: PropTypes.array,
  sideMenuNavItems: PropTypes.array,
};

export default UserHeader;
