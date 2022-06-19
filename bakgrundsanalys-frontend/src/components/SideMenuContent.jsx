import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Div from "@components/Div";
import { TextMediumWeight } from "@components/Text";
import CountTag from "@components/CountTag";

import { Link as PRLink } from "react-router-dom";

const Link = styled(PRLink)`
  text-decoration: none;
`;

const StyledDiv = styled(Div)`
  margin: 10px 0px;
  padding: 15px 20px;
  display: flex;
  color: var(--grey-dark);
  align-items: center;

  &:first-child {
    margin-top: 0px;
  }

  &:hover {
    background: var(--grey-lightest);
  }

  span {
    font-size: var(--fs-h4);
    margin-right: 0;
  }
`;

const SideMenuContent = (props) => {
  const { pathname = "" } = useLocation();
  const { Component = () => <></>, navItems } = props;

  const ActiveMenuItem = (url) => pathname.includes(url);

  const handleWpPageRedirection = (url) => () => {
    window.location = url;
  };

  const menuItem = (item) => {
    return (
      <StyledDiv
        width={[1, 1, 1, 192]}
        justifyContent={["center", "center", "center", "start"]}
        bg={ActiveMenuItem(item.redirectTo) && "var(--grey-lightest)"}
      >
        <TextMediumWeight wordBreak="break-all" mr={2}>
          {item.label}
        </TextMediumWeight>
        {item.count && <CountTag count={item.count} />}
      </StyledDiv>
    );
  };

  return (
    <Div>
      <Component />
      {navItems.map((item) => {
        if (item && item.isWpPage) {
          return (
            <Link
              width={1}
              key={item.label}
              onClick={handleWpPageRedirection(item.redirectTo)}
            >
              {menuItem(item)}
            </Link>
          );
        } else {
          return (
            <Link to={item.redirectTo} width={1} key={item.label}>
              {menuItem(item)}
            </Link>
          );
        }
      })}
    </Div>
  );
};

SideMenuContent.propTypes = {
  Component: PropTypes.node,
  navItems: PropTypes.array,
  styles: PropTypes.object,
};

export default SideMenuContent;
