import React, { useEffect, useState } from "react";
import { getRequests, updateRequest } from "../../api/supplyRequests.instance";
import PageMarkup from "../Page";
import ThemedSuspense from "../../components/ThemedSuspense";
import {
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
import SwitchToggle from "../../components/SwitchToggle";
function List() {
  const [supplyRequests, setSupplyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRequests().then((resp) => {
      setSupplyRequests(resp);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <ThemedSuspense />
  ) : (
    <>
      <PageMarkup
        title="Toutes Les demandes d'achats"
        columns={[
          {
            title: "Matière première",
            dataIndex: "rawMaterial",
          },
          {
            title: "Quantité",
            dataIndex: "quantity",
          },
          {
            title: "Fournisseur",
            dataIndex: "vendor",
          },
          {
            title: "Prix",
            dataIndex: "price",
          },
          {
            title: "Statut",
            dataIndex: "approved",
          },
          {
            title: "Date de demande",
            dataIndex: "createdAt",
          },
        ]}
        bulkData={supplyRequests.map((request) => {
          return {
            ...request,
            createdAt: new Intl.DateTimeFormat("fr-FR", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(Date.parse(request["createdAt"])),
            approved: request.approved ? (
              <Badge type="success">Confirmé</Badge>
            ) : (
              <Badge type="danger">Non Confirmé</Badge>
            ),
          };
        })}
        rowClick={(sale) => {
          console.log({ sale });
        }}
      />
    </>
  );
}

export default List;
