import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { compose, space, flexbox, layout } from "styled-system";
import { Menubar as PRStyledMenubar } from "primereact/menubar";
import breakpoints from "@utils/breakpoints";
import Config from "@src/config";
import useHistory from "@utils/useHistory";

const mobileBreakPoint = Config.mobileBreakPoint;

const MenuBar = styled(PRStyledMenubar)`
  position: sticky;
  max-height: 135px;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--white);
  border: none;
  .p-menubar-root-list > .p-menuitem > .p-menuitem-link:focus {
    box-shadow: none;
  }
  ${compose(space, flexbox, layout)};
  .p-menubar-root-list {
    .p-menuitem {
      .p-menuitem-link {
        padding: 0px 15px;
      }
    }
  }
  .p-menubar-button {
    display: none;
  }
  .p-menubar-end {
    & > div {
      display: flex;
      flex-direction: row;
      button:nth-child(2) {
        width: 100%;
      }
    }
  }
  &.p-menubar.p-component {
    padding: 0px 70px 0px;
    background: var(--white);
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.06);
    .p-menubar-root-list {
      padding-left: 20px;
      padding-top: 70px;
      .p-menuitem {
        .p-menuitem-link {
          transition: none !important;
          &:hover {
            background: var(--white);
          }
          .p-menuitem-text {
            padding-bottom: 30px;
            border-bottom: 5px solid transparent;
            color: var(--grey-dark) !important;
            font-size: var(--fs-h4);
            line-height: 25px;
            font-weight: var(--medium-weight) !important;
            &:hover {
              border-bottom: 5px solid var(--blue-medium);
              color: var(--blue-medium) !important;
            }
          }
        }
      }
    }
  }
  @media (max-width: ${breakpoints[mobileBreakPoint]}px) {
    min-height: 83px;
    .p-menubar-button,
    .p-menubar-end {
      display: none !important;
    }
    .p-menubar-start {
      width: 100%;
      display: flex;
      align-content: space-between;
      justify-content: space-between;
      align-items: center;
    }
    &.p-menubar.p-component {
      padding: 16px 23px 22px;
      .p-menubar-root-list {
        display: none !important;
      }
    }
  }
`;

const SideMenu = (props) => {
  const { model, start, end } = props;

  const history = useHistory();

  const items = model.map((item) => {
    const { redirectTo = "", isWpPage = "", value = "" } = item;
    if (isWpPage) {
      item.url = redirectTo;
    } else {
      item.command = () => {
        history.push(value);
      };
    }
    return item;
  });

  return <MenuBar model={items} start={start} end={end} {...props} />;
};

SideMenu.propTypes = {
  model: PropTypes.array,
  start: PropTypes.function,
  end: PropTypes.function,
};

export default SideMenu;
