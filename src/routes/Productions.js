import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import OrderDetails from "./Orders/OrderDetails";
import Productions from "../pages/Productions/List";

export default function ProductionNavigation() {
  let routes = (
    <Switch>
      <Route exact path={`/productions/all`} render={() => <Productions />} />

      {/* <Route
        exact
        path={`${process.env.PUBLIC_URL}/orders/all/:id`}
        render={({ match }) => <OrderDetails id={match.params.id} />}
      /> */}

      <Route path="*" render={() => <Redirect to={`/productions/all`} />} />
    </Switch>
  );

  return routes;
}
