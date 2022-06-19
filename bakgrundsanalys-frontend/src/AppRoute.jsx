/* eslint-disable */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RoutesList } from "@shared/RoutesList";
import AdminLayout from "./layout/AdminLayout";
import CustomerLayout from "./layout/CustomerLayout";
import CustomerGuestLayout from "./layout/GuestLayout";
import AdminGuestLayout from "./layout/AdminGuestLayout";

const renderSelf = (components) =>
  components.map((Component, key) => <Component key={key} />);

const UserLayout = ({ isAdmin, components }) =>
  isAdmin ? (
    <AdminLayout>{renderSelf(components)}</AdminLayout>
  ) : (
    <CustomerLayout>{renderSelf(components)}</CustomerLayout>
  );

const GuestLayout = ({ isAdmin, components }) =>
  isAdmin ? (
    <AdminGuestLayout>{renderSelf(components)}</AdminGuestLayout>
  ) : (
    <CustomerGuestLayout>{renderSelf(components)}</CustomerGuestLayout>
  );

const renderComponent = (components, isAdmin, showSidemenu) =>
  showSidemenu ? (
    <UserLayout isAdmin={isAdmin} components={components} />
  ) : (
    <GuestLayout isAdmin={isAdmin} components={components} />
  );

const AppRoute = () => (
  <Router>
    <Switch>
      {RoutesList.map(
        (
          {
            url: route,
            component: components,
            title: title,
            isAdmin = false,
            showSidemenu = false,
          },
          index
        ) => (
          <Route
            location={location}
            exact
            path={`${route}`}
            component={() => renderComponent(components, isAdmin, showSidemenu)}
            key={index}
            title={title}
            isAdmin={isAdmin}
          />
        )
      )}
    </Switch>
  </Router>
);
export default AppRoute;
