import React, { useEffect, useState } from "react";
import PageMarkup from "../Page";
import ThemedSuspense from "../../components/ThemedSuspense";
import { getCustomers } from "../../api/customers.instance";

function List() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCustomers().then((resp) => {
      setClients(resp);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <ThemedSuspense />
  ) : (
    <>
      <PageMarkup
        title="Tous les clients"
        columns={[
          {
            title: "Nom",
            dataIndex: "lastName",
          },
          {
            title: "Prénoms",
            dataIndex: "firstName",
          },
          {
            title: "Numéro de Téléphone",
            dataIndex: "phone",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
        ]}
        bulkData={clients}
        rowClick={(_) => {
          console.log("nevermind");
        }}
      />
    </>
  );
}

export default List;
