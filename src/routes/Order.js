import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import OrderDetails from "./Orders/OrderDetails";
import Orders from "../pages/Orders/List";

export default function OrderNavigation() {
  let routes = (
    <Switch>
      <Route exact path={`/orders/all`} render={() => <Orders />} />

      {/* <Route
        exact
        path={`${process.env.PUBLIC_URL}/orders/all/:id`}
        render={({ match }) => <OrderDetails id={match.params.id} />}
      /> */}

      <Route path="*" render={() => <Redirect to={`/orders/all`} />} />
    </Switch>
  );

  return routes;
}
