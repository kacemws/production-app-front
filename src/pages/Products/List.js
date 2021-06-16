import React, { useEffect, useState } from "react";
import PageMarkup from "../Page";
import ThemedSuspense from "../../components/ThemedSuspense";
import {
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Button,
  HelperText,
} from "@windmill/react-ui";
import { getProducts, addProduct } from "../../api/products.instance";
import SwitchToggle from "../../components/SwitchToggle";

function List() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(false);

  // *********************************

  const [data, setData] = useState({
    code: "",
    designation: "",
    price: 0,
    mesureUnit: "",
    disponibility: false,
  });

  useEffect(() => {
    getProducts().then((resp) => {
      setProducts(resp);
      setLoading(false);
    });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    if (innerLoading) return;
    setData({
      code: "",
      designation: "",
      price: "",
      mesureUnit: "",
      disponibility: "",
    });
    setModalOpen(false);
    setInnerLoading(false);
  };

  const handleConfirm = async () => {
    if (innerLoading) return;
    if (Object.values(data).includes("")) {
      alert("Veuillez remplire le formulaire ! ");
      return;
    }
    if (data.price < 1) {
      alert("Veuillez saisir une valeur valide");
      return;
    }
    setInnerLoading(true);
    try {
      console.log(data);
      await addProduct({
        code: data.code,
        designation: data.designation,
        price: data.price,
        mesureUnit: data.mesureUnit,
        disponibility: data.disponibility,
      });
      const auxProducts = await getProducts();
      setProducts([...auxProducts]);
      closeModal();
    } catch (err) {
      console.error(err);
      let message = err?.response?.data?.message;
      alert(message);
      setInnerLoading(false);
    }
  };

  return loading ? (
    <ThemedSuspense />
  ) : (
    <>
      <PageMarkup
        title="Tout les produits"
        cta={{
          title: "Ajouter produit",
          onClick: (_) => {
            setModalOpen(true);
          },
        }}
        columns={[
          {
            title: "Code",
            dataIndex: "code",
          },
          {
            title: "Désignation",
            dataIndex: "designation",
          },
          {
            title: "Prix",
            dataIndex: "price",
          },
          {
            title: "Unité de mesure",
            dataIndex: "mesureUnit",
          },
          {
            title: "Disponibilité",
            dataIndex: "disponibility",
          },
        ]}
        bulkData={products.map((product) => {
          return {
            ...product,
            disponibility: product.disponibility ? (
              <Badge type="success">Disponible</Badge>
            ) : (
              <Badge type="danger">Indisponible</Badge>
            ),
          };
        })}
        rowClick={(_) => {
          console.log("nevermind");
        }}
      />
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <ModalHeader>Ajouter un produit</ModalHeader>
        <ModalBody>
          <Label>
            <span>Code Produit</span>
            <Input
              className="mt-1"
              placeholder="xxxxxxxxxxxx"
              onChange={(event) => {
                setData({
                  ...data,
                  code: event.target.value,
                });
              }}
            />
          </Label>
          <Label className="mt-4">
            <span>Désignation</span>
            <Input
              className="mt-1"
              placeholder="Cable cuivre"
              onChange={(event) => {
                setData({
                  ...data,
                  designation: event.target.value,
                });
              }}
            />
          </Label>
          <Label className="mt-4">
            <span>Price</span>
            <Input
              className="mt-1"
              type="number"
              placeholder="0"
              value={data.price}
              onChange={(event) => {
                if (event.target.value < 0) {
                  alert("Veuillez saisir une valeur valide");
                  return;
                }
                setData({
                  ...data,
                  price: event.target.value,
                });
              }}
            />
          </Label>
          <Label className="mt-4">
            <span>Unité de mesure</span>
            <Input
              className="mt-1"
              placeholder="KG"
              onChange={(event) => {
                setData({
                  ...data,
                  mesureUnit: event.target.value,
                });
              }}
            />
          </Label>

          <Label className="mt-4">
            <span>Disponibilité</span>
            <div className="mt-1">
              <SwitchToggle
                switchOn={data.disponibility}
                onToggle={(_) => {
                  setData({
                    ...data,
                    disponibility: !data.disponibility,
                  });
                }}
              />
            </div>
          </Label>
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
