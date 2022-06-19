import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components";
import { compose, flexbox, layout } from "styled-system";
import {
  TabView as PRTabView,
  TabPanel as PRTabPanel,
} from "primereact/tabview";
import breakpoints from "@utils/breakpoints";
import Config from "@src/config";

const mobileBreakPoint = Config.mobileBreakPoint;

const StyledTabView = styled(PRTabView)`
  padding-bottom: 8px;
  ${compose(layout, flexbox)};
  .p-tabview-nav {
    font-size: var(--fs-h5);
    background-color: var(--white);
    border-radius: 12px;
    border: none;
    display: flex;
    justify-content: center;
    li {
      min-width: 17%;
      margin-bottom: 5px;
      .p-tabview-nav-link {
        padding: 10px;
        display: flex;
        justify-content: center;
        border: none;
        text-align: center;
        box-shadow: none !important;
        max-width: 175px;
      }
      &:not(.p-highlight) {
        .p-tabview-title {
          color: var(--grey-dark);
        }
      }
      &.p-highlight {
        .p-tabview-nav-link {
          background: var(--blue-dark);
          border-color: var(--white);
          color: var(--white);
          border-radius: 12px;
          border: none;
          &:not(.p-disabled):focus {
            box-shadow: none;
          }
        }
      }
    }
  }
  .p-tabview-title {
    font-weight: var(--medium-weight);
    font-size: var(--fs-h6);
    line-height: 20px;
  }
  .p-tabview-panels {
    padding: 0;
  }

  @media (max-width: ${breakpoints[mobileBreakPoint]}px) {
    .p-tabview-nav {
      justify-content: center;
    }
  }
`;
const StyledTabPanel = styled(PRTabPanel)(layout, flexbox);

const Tabs = ({ content, onTabChange, activeIndex, ...props }) => {
  return (
    <StyledTabView
      {...props}
      activeIndex={activeIndex}
      onTabChange={onTabChange}
    >
      {content.map((value, index) => (
        <StyledTabPanel key={index} header={value.title}>
          {value.content}
        </StyledTabPanel>
      ))}
    </StyledTabView>
  );
};

Tabs.propTypes = {
  content: Proptypes.array.isRequired,
  onTabChange: Proptypes.func,
  activeIndex: Proptypes.bool,
};

export default Tabs;
