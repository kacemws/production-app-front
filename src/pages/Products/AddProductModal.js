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

function AddProductModal({
  modalOpen,
  closeModal,
  handleConfirm,
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
          <Button disabled={innerLoading} layout="outline" onClick={closeModal}>
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
  );
}

export default AddProductModal;
