import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { default as Div } from "@components/Div";
import Icon from "@components/Icon";
import Link from "@components/Link";
import Span from "@components/Span";
import Sidebar from "@components/Sidebar";
import SideMenu from "@components/SideMenu";
import SideMenuContent from "@components/SideMenuContent";
import FooterLayout from "@src/layout/FooterLayout";
import { H4 } from "@components/Heading";
import { LOGIN } from "@utils/constant";

const AdminHeader = (props) => {
  const { navItems = [], sideMenuNavItems = [] } = props;

  const { messages } = useIntl();
  const isLoggedIn = localStorage.getItem("token");

  const WebSideBar = () => {
    const [visibleFullScreen, setVisibleFullScreen] = useState(false);
    const props = {
      navItems: isLoggedIn ? sideMenuNavItems : navItems,
    };

    return (
      <Div display={["flex", "flex", "flex", "none"]}>
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
            <H4 mx={"auto"} pl={32}>
              {messages.header_menu}
            </H4>
          }
          onHide={() => setVisibleFullScreen(false)}
        >
          <Div
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <SideMenuContent {...props} />
            <FooterLayout
              buttonLabel={
                <Span semibold info>
                  {isLoggedIn ? messages.label_log_out : messages.login}
                </Span>
              }
              redirectTo={LOGIN}
            />
          </Div>
        </Sidebar>
      </Div>
    );
  };

  const start = (
    <>
      {props.start}
      <WebSideBar />
    </>
  );

  return <SideMenu model={navItems} start={start} width={[1, 1, 1]} />;
};

AdminHeader.propTypes = {
  config: PropTypes.object,
  navItems: PropTypes.array,
  sideMenuNavItems: PropTypes.array,
  start: PropTypes.node,
};

export default AdminHeader;
