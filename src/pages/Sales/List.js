import React, { useEffect, useState } from "react";
import { getSales, updateSale } from "../../api/sales.instance";
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
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(false);

  useEffect(() => {
    getSales().then((resp) => {
      setSales(resp);
      setLoading(false);
    });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [switchToggled, setSwitchToggled] = useState(false);
  const [selected, setSelected] = useState(null);

  const closeModal = () => {
    if (innerLoading) return;
    setModalOpen(false);
    setSwitchToggled(false);
    setSelected(null);
    setInnerLoading(false);
  };

  const handleConfirm = async () => {
    if (innerLoading) return;
    setInnerLoading(true);
    try {
      console.log(selected);
      await updateSale(selected["_id"], {
        confirmed: switchToggled,
      });
      const auxOrders = await getSales();
      setSales([...auxOrders]);
      closeModal();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message);
      setInnerLoading(false);
    }
  };

  return loading ? (
    <ThemedSuspense />
  ) : (
    <>
      <PageMarkup
        title="Toutes Les Ventes"
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
            dataIndex: "confirmed",
          },
          {
            title: "Date de vente",
            dataIndex: "createdAt",
          },
        ]}
        bulkData={sales.map((order) => {
          return {
            ...order,
            createdAt: new Intl.DateTimeFormat("fr-FR", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(Date.parse(order["createdAt"])),
            confirmed: order.confirmed ? (
              <Badge type="success">Confirmé</Badge>
            ) : (
              <Badge type="danger">Non Confirmé</Badge>
            ),
          };
        })}
        rowClick={(sale) => {
          setModalOpen(true);
          setSelected(sale);
          setSwitchToggled(sale?.confirmed?.props?.type == "success");
        }}
      />
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <ModalHeader>Modifier le statut de la vente</ModalHeader>
        <ModalBody>
          <div className="w-full h-12 my-2 flex justify-center items-center">
            <span className="text-sm mx-2">Non Confirmée</span>
            <SwitchToggle
              switchOn={switchToggled}
              onToggle={(_) => {
                setSwitchToggled(!switchToggled);
              }}
            />
            <span className="text-sm mx-2">Confirmée</span>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button
              disabled={innerLoading}
              layout="outline"
              onClick={closeModal}
            >
              Annuler
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button disabled={innerLoading} onClick={handleConfirm}>
              Confirmer
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button
              disabled={innerLoading}
              block
              size="large"
              layout="outline"
              onClick={closeModal}
            >
              Annuler
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button
              disabled={innerLoading}
              onClick={handleConfirm}
              block
              size="large"
            >
              Confirmer
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default List;
