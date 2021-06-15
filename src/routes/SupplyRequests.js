import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import OrderDetails from "./Orders/OrderDetails";
import SupplyRequests from "../pages/Orders/List";

export default function SupplyRequestsNavigation() {
  let routes = (
    <Switch>
      <Route
        exact
        path={`/supply-requests/all`}
        render={() => <SupplyRequests />}
      />

      {/* <Route
        exact
        path={`${process.env.PUBLIC_URL}/orders/all/:id`}
        render={({ match }) => <OrderDetails id={match.params.id} />}
      /> */}

      <Route path="*" render={() => <Redirect to={`/supply-requests/all`} />} />
    </Switch>
  );

  return routes;
}
