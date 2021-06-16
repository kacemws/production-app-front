import React, { useEffect, useState } from "react";
import PageMarkup from "../Page";
import ThemedSuspense from "../../components/ThemedSuspense";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Button,
  HelperText,
} from "@windmill/react-ui";

import { addVendor, getVendors } from "../../api/vendors.instance";
function List() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(false);
  const [error, setError] = useState(false);

  // *********************************

  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    state: "",
  });

  useEffect(() => {
    getVendors().then((resp) => {
      setVendors(resp);
      setLoading(false);
    });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    if (innerLoading) return;
    setModalOpen(false);
    setInnerLoading(false);
    setError(false);
  };

  const handleConfirm = async () => {
    setError(false);
    if (innerLoading) return;
    if (Object.values(data).includes("")) {
      alert("Veuillez remplire le formulaire ! ");
      return;
    }
    setInnerLoading(true);
    try {
      console.log(data);
      await addVendor({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        state: data.state,
        email: data.email,
        role: "vendor",
        password: data.password,
      });
      const auxVendors = await getVendors();
      setVendors([...auxVendors]);
      closeModal();
    } catch (err) {
      console.error(err);
      let message = err?.response?.data?.message;
      console.log({ message, condition: message == "already exisits" });
      if (message.includes("exisits")) {
        setError(true);
      } else {
        alert(message);
      }
      setInnerLoading(false);
    }
  };

  return loading ? (
    <ThemedSuspense />
  ) : (
    <>
      <PageMarkup
        title="Tout les fournisseurs"
        cta={{
          title: "Ajouter fournisseur",
          onClick: (_) => {
            setModalOpen(true);
          },
        }}
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
          {
            title: "Ville",
            dataIndex: "state",
          },
        ]}
        bulkData={vendors}
        rowClick={(_) => {
          console.log("nevermind");
        }}
      />
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <ModalHeader>Ajouter un fournisseur</ModalHeader>
        <ModalBody>
          <Label>
            <span>Nom</span>
            <Input
              className="mt-1"
              placeholder="Afoun"
              onChange={(event) => {
                setData({
                  ...data,
                  lastName: event.target.value,
                });
              }}
            />
          </Label>
          <Label className="mt-4">
            <span>Prénoms</span>
            <Input
              className="mt-1"
              placeholder="Yousra Bouchra"
              onChange={(event) => {
                setData({
                  ...data,
                  firstName: event.target.value,
                });
              }}
            />
          </Label>
          <Label className="mt-4">
            <span>Numéro de téléphpne</span>
            <Input
              className="mt-1"
              type="tel"
              placeholder="0X-XX-XX-XX-XX"
              onChange={(event) => {
                setData({
                  ...data,
                  phone: event.target.value,
                });
              }}
            />
          </Label>
          <Label className="mt-4">
            <span>Email</span>
            <Input
              className="mt-1"
              type="email"
              placeholder="john@doe.com"
              onChange={(event) => {
                setData({
                  ...data,
                  email: event.target.value,
                });
              }}
            />
            {error && <HelperText valid={false}>Email utilisé</HelperText>}
          </Label>

          <Label className="mt-4">
            <span>Ville</span>
            <Input
              className="mt-1"
              placeholder="Mostaganem"
              onChange={(event) => {
                setData({
                  ...data,
                  state: event.target.value,
                });
              }}
            />
          </Label>
          <Label className="mt-4">
            <span>Mot de passe</span>
            <Input
              className="mt-1"
              placeholder="password"
              onChange={(event) => {
                setData({
                  ...data,
                  password: event.target.value,
                });
              }}
            />
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
