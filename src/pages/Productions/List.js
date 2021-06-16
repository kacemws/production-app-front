import React, { useEffect, useState } from "react";
import PageMarkup from "../Page";
import ThemedSuspense from "../../components/ThemedSuspense";
import { getProductions } from "../../api/productions.instance";

function List() {
  const [productions, setProductions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductions().then((resp) => {
      setProductions(resp);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <ThemedSuspense />
  ) : (
    <>
      <PageMarkup
        title="Toute les productions"
        columns={[
          {
            title: "Produit",
            dataIndex: "product",
          },
          {
            title: "Statut",
            dataIndex: "state",
          },
          {
            title: "Durée de production",
            dataIndex: "duration",
          },
          {
            title: "Quantité",
            dataIndex: "quantity",
          },
          {
            title: "Date de lancement",
            dataIndex: "start",
          },
        ]}
        bulkData={productions.map((production) => {
          return {
            ...production,
            start: new Intl.DateTimeFormat("fr-FR", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(Date.parse(production["start"])),
          };
        })}
        rowClick={(_) => {
          console.log("nevermind");
        }}
      />
    </>
  );
}

export default List;
