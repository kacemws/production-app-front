import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import OrderDetails from "./Orders/OrderDetails";
import Materials from "../pages/Materials/List";

export default function MaterialNavigation() {
  let routes = (
    <Switch>
      <Route exact path={`/raw-materials/all`} render={() => <Materials />} />

      {/* <Route
        exact
        path={`${process.env.PUBLIC_URL}/orders/all/:id`}
        render={({ match }) => <OrderDetails id={match.params.id} />}
      /> */}

      <Route path="*" render={() => <Redirect to={`/raw-materials/all`} />} />
    </Switch>
  );

  return routes;
}
