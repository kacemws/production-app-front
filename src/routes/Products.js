import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import OrderDetails from "./Orders/OrderDetails";
import Products from "../pages/Products/List";

export default function ProductNavigation() {
  let routes = (
    <Switch>
      <Route exact path={`/products/all`} render={() => <Products />} />

      {/* <Route
        exact
        path={`${process.env.PUBLIC_URL}/orders/all/:id`}
        render={({ match }) => <OrderDetails id={match.params.id} />}
      /> */}

      <Route path="*" render={() => <Redirect to={`/products/all`} />} />
    </Switch>
  );

  return routes;
}
