/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Accueil", // name that appear in Sidebar
  },
  {
    icon: "FormsIcon",
    name: "Commandes",
    routes: [
      {
        path: "/orders/all",
        name: "Tout les commandes",
      },
      {
        path: "/sales/all",
        name: "Toutes les ventes",
      },
    ],
  },
  {
    icon: "CardsIcon",
    name: "Produits",
    routes: [
      {
        path: "/products/all",
        name: "Tout les produits",
      },
      {
        path: "/productions/all",
        name: "Toutes les productions",
      },
    ],
  },
  {
    icon: "SuppliesIcon",
    name: "Matières première",
    routes: [
      {
        path: "/raw-materials/all",
        name: "Toutes les matières premières",
      },
      {
        path: "/supply-requests/all",
        name: "Toutes les demandes d'achats",
      },
      {
        path: "/supplies/all",
        name: "Tous les achats",
      },
    ],
  },
  {
    path: "/vendors/all",
    icon: "VendorsIcon",
    name: "Fournisseurs",
  },

  {
    path: "/customers/all",
    icon: "ClientsIcon",
    name: "Clients",
  },
];

export default routes;
