import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import OrderDetails from "./Orders/OrderDetails";
import Sales from "../pages/Sales/List";

export default function SaleNavigation() {
  let routes = (
    <Switch>
      <Route exact path={`/sales/all`} render={() => <Sales />} />

      {/* <Route
        exact
        path={`${process.env.PUBLIC_URL}/orders/all/:id`}
        render={({ match }) => <OrderDetails id={match.params.id} />}
      /> */}

      <Route path="*" render={() => <Redirect to={`/sales/all`} />} />
    </Switch>
  );

  return routes;
}
