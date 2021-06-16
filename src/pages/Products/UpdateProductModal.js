import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Button,
} from "@windmill/react-ui";
import SwitchToggle from "../../components/SwitchToggle";

function UpdateProductModal({
  modalOpen,
  closeModal,
  handleConfirm,
  handleDelete,
  data,
  setData,
  innerLoading,
}) {
  return (
    <Modal isOpen={modalOpen} onClose={closeModal}>
      <ModalHeader>Ajouter un produit</ModalHeader>
      <ModalBody>
        <Label>
          <span>Code Produit</span>
          <Input
            className="mt-1"
            placeholder="xxxxxxxxxxxx"
            value={data?.code}
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
            value={data?.designation}
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
            value={data?.price}
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
            value={data?.mesureUnit}
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
              switchOn={data?.disponibility}
              onToggle={(_) => {
                setData({
                  ...data,
                  disponibility: !data?.disponibility,
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
            onClick={handleDelete}
          >
            Supprimer
          </Button>
        </div>
        <div className="hidden sm:block">
          <Button disabled={innerLoading} onClick={handleConfirm}>
            Mettre à jour
          </Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button
            disabled={innerLoading}
            block
            size="large"
            layout="outline"
            onClick={handleDelete}
          >
            Supprimer
          </Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button
            disabled={innerLoading}
            onClick={handleConfirm}
            block
            size="large"
          >
            Mettre à jour
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default UpdateProductModal;
