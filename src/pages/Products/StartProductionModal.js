import React, { useState } from "react";
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

function ProductionModal({
  modalOpen,
  closeModal,
  handleConfirm,
  data,
  innerLoading,
}) {
  const [production, setProduction] = useState({
    duration: 0,
    quantity: 0,
  });

  const confirm = () => {
    if (production.duration < 0 || production.quantity < 0) {
      alert("Veuillez saisir des données valide");
    }
    console.log({ production });
    handleConfirm(production);
  };
  return (
    <Modal isOpen={modalOpen} onClose={closeModal}>
      <ModalHeader>Démarrer la production</ModalHeader>
      <ModalBody>
        <Label>
          <span>Quantité</span>
          <Input
            className="mt-1"
            type="number"
            placeholder="0"
            value={production.quantity}
            onChange={(event) => {
              if (event.target.value < 0) {
                alert("Veuillez saisir une valeur valide");
                return;
              }
              setProduction({
                ...production,
                quantity: Number.parseInt(event.target.value),
              });
            }}
          />
        </Label>
        <Label className="mt-4">
          <span>Durée</span>
          <Input
            className="mt-1"
            type="number"
            placeholder="0"
            value={production.duration}
            onChange={(event) => {
              if (event.target.value < 0) {
                alert("Veuillez saisir une valeur valide");
                return;
              }
              setProduction({
                ...production,
                duration: Number.parseInt(event.target.value),
              });
            }}
          />
        </Label>
      </ModalBody>
      <ModalFooter>
        <div className="hidden sm:block">
          <Button disabled={innerLoading} layout="outline" onClick={closeModal}>
            Annuler
          </Button>
        </div>
        <div className="hidden sm:block">
          <Button disabled={innerLoading} onClick={confirm}>
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
          <Button disabled={innerLoading} onClick={confirm} block size="large">
            Confirmer
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default ProductionModal;
