import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import OrderDetails from "./Orders/OrderDetails";
import Vendors from "../pages/Orders/List";

export default function VendorNavigation() {
  let routes = (
    <Switch>
      <Route exact path={`/vendors/all`} render={() => <Vendors />} />

      {/* <Route
        exact
        path={`${process.env.PUBLIC_URL}/orders/all/:id`}
        render={({ match }) => <OrderDetails id={match.params.id} />}
      /> */}

      <Route path="*" render={() => <Redirect to={`/vendors/all`} />} />
    </Switch>
  );

  return routes;
}
