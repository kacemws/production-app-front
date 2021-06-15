import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Cards = lazy(() => import("../pages/Cards"));
const Charts = lazy(() => import("../pages/Charts"));
const Buttons = lazy(() => import("../pages/Buttons"));
const Modals = lazy(() => import("../pages/Modals"));
const Tables = lazy(() => import("../pages/Tables"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const Forms = lazy(() => import("../pages/Forms"));
const Orders = lazy(() => import("./Order"));
const Customers = lazy(() => import("./Customers"));
const Materials = lazy(() => import("./Materials"));
const Productions = lazy(() => import("./Productions"));
const Products = lazy(() => import("./Products"));
const Sales = lazy(() => import("./Sales"));
const Vendors = lazy(() => import("./Vendors"));
const Supplies = lazy(() => import("./Supplies"));
const SupplyRequests = lazy(() => import("./SupplyRequests"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/orders",
    component: Orders,
  },
  {
    path: "/sales",
    component: Sales,
  },
  {
    path: "/products",
    component: Products,
  },
  {
    path: "/productions",
    component: Productions,
  },
  {
    path: "/raw-materials",
    component: Materials,
  },
  {
    path: "/supply-requests",
    component: SupplyRequests,
  },
  {
    path: "/supplies",
    component: Supplies,
  },
  {
    path: "/vendors/",
    component: Vendors,
  },
  {
    path: "/customers",
    component: Customers,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;
