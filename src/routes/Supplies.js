import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import OrderDetails from "./Orders/OrderDetails";
import Supplies from "../pages/Orders/List";

export default function SuppliesNavigation() {
  let routes = (
    <Switch>
      <Route exact path={`/supplies/all`} render={() => <Supplies />} />

      {/* <Route
        exact
        path={`${process.env.PUBLIC_URL}/orders/all/:id`}
        render={({ match }) => <OrderDetails id={match.params.id} />}
      /> */}

      <Route path="*" render={() => <Redirect to={`/supplies/all`} />} />
    </Switch>
  );

  return routes;
}
