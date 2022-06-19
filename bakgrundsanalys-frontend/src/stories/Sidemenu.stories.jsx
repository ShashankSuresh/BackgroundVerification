// import React, { useState } from "react";
// import Sidemenu from "@components/Sidebar/Sidemenu";
// import { PrimaryButton } from "@components/Button";

// export default {
//   title: "components/Sidebar",
// };

// const loggedInAdminMenu = [
//   {
//     label: "DASHBOARD",
//     redirectTo: "/dashboard",
//   },
//   {
//     label: "CUSTOMERS",
//     redirectTo: "/customers",
//   },
//   {
//     label: "ORDERS",
//     redirectTo: "/orders",
//   },
//   {
//     label: "ASSIGNMENTS",
//     redirectTo: "/assignments",
//   },
//   {
//     label: "USERS",
//     redirectTo: "/users",
//   },
// ];

// const adminMenu = [
//   {
//     label: "To Svensk Bakgrundsanalys",
//     redirectTo: "/home",
//   },
//   {
//     label: "Contacts",
//     redirectTo: "/contacts",
//   },
// ];

// const webMenu = [
//   {
//     label: "Vad ar bakgrundsanalys",
//     redirectTo: "/home",
//     count: 3,
//   },
//   {
//     label: "Vara tjanster",
//     redirectTo: "/tjanster",
//   },
//   {
//     label: "Contacts",
//     redirectTo: "/contacts",
//   },
//   {
//     label: "Nyheter",
//     redirectTo: "/nyheter",
//   },
// ];

// const search = [
//   {
//     label: "search",
//     redirectTo: "/",
//   },
// ];

// const userMenu = [
//   {
//     label: "COMPANY INFO",
//     redirectTo: "/company-info",
//   },
//   {
//     label: "USER INFO",
//     redirectTo: "/user-info",
//   },
//   {
//     label: "SUB USERS",
//     redirectTo: "/sub-users",
//   },
//   {
//     label: "ORDERS HISTORY",
//     redirectTo: "/order-history",
//   },
//   {
//     label: "RECURRENT ANALYSIS",
//     redirectTo: "/recurrant-analysis",
//   },
// ];

// export const WebSideBar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const handleMenuAction = () => {
//     setShowMenu(!showMenu);
//   };
//   const config = {
//     navItems: webMenu,
//     count: 3,
//     isWebsite: true,
//     isLoggedIn: false,
//     title: "MENU",
//     footerTitle: "Log in",
//     onFooterTitleClick: () => {},
//     onClose: handleMenuAction,
//     visibility: showMenu,
//   };
//   return (
//     <>
//       <PrimaryButton label="Menu" onClick={handleMenuAction} />
//       <Sidemenu config={config} />
//     </>
//   );
// };

// export const AppSideBar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const handleMenuAction = () => {
//     setShowMenu(!showMenu);
//   };
//   const config = {
//     navItems: [...search, ...webMenu],
//     isApp: true,
//     isLoggedIn: false,
//     title: "MENU",
//     footerTitle: "Log in",
//     onFooterTitleClick: () => {},
//     onClose: handleMenuAction,
//     visibility: showMenu,
//   };
//   return (
//     <>
//       {!showMenu && <PrimaryButton label="Menu" onClick={handleMenuAction} />}
//       <Sidemenu config={config} />
//     </>
//   );
// };

// export const LoggedInUserSideBar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const handleMenuAction = () => {
//     setShowMenu(!showMenu);
//   };
//   const config = {
//     navItems: [...search, ...webMenu],
//     subMenuItems: userMenu,
//     isApp: true,
//     isLoggedIn: true,
//     title: "MENU",
//     footerTitle: "Log out",
//     onFooterTitleClick: () => {},
//     userDetails: { name: "Roopa", price: 2500 },
//     onClose: handleMenuAction,
//     visibility: showMenu,
//   };
//   return (
//     <>
//       {!showMenu && <PrimaryButton label="Menu" onClick={handleMenuAction} />}
//       <Sidemenu config={config} />
//     </>
//   );
// };

// export const AdminSideBar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const handleMenuAction = () => {
//     setShowMenu(!showMenu);
//   };
//   const config = {
//     navItems: adminMenu,
//     isAdmin: true,
//     isLoggedIn: false,
//     title: "MENU",
//     footerTitle: "Log in",
//     onFooterTitleClick: () => {},
//     onClose: handleMenuAction,
//     visibility: showMenu,
//   };
//   return (
//     <>
//       <PrimaryButton label="Menu" onClick={handleMenuAction} />
//       <Sidemenu config={config} />
//     </>
//   );
// };

// export const LoggedInAdminSideBar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const handleMenuAction = () => {
//     setShowMenu(!showMenu);
//   };
//   const config = {
//     navItems: loggedInAdminMenu,
//     isAdmin: true,
//     isLoggedIn: true,
//     title: "MENU",
//     footerTitle: "Log out",
//     userName: "My profile",
//     onFooterTitleClick: () => {},
//     onClose: handleMenuAction,
//     visibility: showMenu,
//   };
//   return (
//     <>
//       <PrimaryButton label="Menu" onClick={handleMenuAction} />
//       <Sidemenu config={config} />
//     </>
//   );
// };
