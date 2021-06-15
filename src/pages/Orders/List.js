import React, { useEffect, useState } from "react";
import { getOrders } from "../../api/orders.instance";
import PageMarkup from "../Page";
import ThemedSuspense from "../../components/ThemedSuspense";
import { Badge } from "@windmill/react-ui";
function List() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((resp) => {
      setOrders(resp);
      console.log({ resp });
      setLoading(false);
    });
  }, []);
  return loading ? (
    <ThemedSuspense />
  ) : (
    <PageMarkup
      title="Toutes Les Commandes"
      columns={[
        {
          title: "Produit",
          dataIndex: "product",
        },
        {
          title: "Quantité",
          dataIndex: "quantity",
        },
        {
          title: "Client",
          dataIndex: "client",
        },
        {
          title: "Prix",
          dataIndex: "price",
        },
        {
          title: "Statut",
          dataIndex: "status",
        },
      ]}
      bulkData={orders.map((order) => {
        return {
          ...order,
          status:
            order.status == "open" ? (
              <Badge type="success">Ouverte</Badge>
            ) : (
              <Badge type="danger">Fermée</Badge>
            ),
        };
      })}
    />
  );
}

export default List;
