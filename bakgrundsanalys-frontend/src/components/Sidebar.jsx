import styled from "styled-components";
import { Sidebar as PRSidebar } from "primereact/sidebar";
import { breakpoints } from "@utils/breakpoints";
import Config from "@src/config";

const mobileBreakPoint = Config.mobileBreakPoint;

const Sidebar = styled(PRSidebar)`
  .p-sidebar-header {
    padding: 16px;
    .p-sidebar-close:enabled:hover,
    .p-sidebar-icon:enabled:hover {
      background-color: transparent !important;
    }
    .p-sidebar-close:focus,
    .p-sidebar-icon:focus {
      box-shadow: none !important;
    }
  }
  .p-sidebar-content {
    height: 100%;
    padding: 0px;
    overflow: inherit;
  }
  display: none;
  @media (max-width: ${breakpoints[mobileBreakPoint]}px) {
    display: flex;
  }
`;
export default Sidebar;
