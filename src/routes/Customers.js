import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import OrderDetails from "./Orders/OrderDetails";
import Customers from "../pages/Orders/List";

export default function CustomerNavigation() {
  let routes = (
    <Switch>
      <Route exact path={`/customers/all`} render={() => <Customers />} />

      {/* <Route
        exact
        path={`${process.env.PUBLIC_URL}/orders/all/:id`}
        render={({ match }) => <OrderDetails id={match.params.id} />}
      /> */}

      <Route path="*" render={() => <Redirect to={`/customers/all`} />} />
    </Switch>
  );

  return routes;
}
