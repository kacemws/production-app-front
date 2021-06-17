import React, { useEffect, useState } from "react";
import PageMarkup from "../Page";
import ThemedSuspense from "../../components/ThemedSuspense";
import { Badge, Button } from "@windmill/react-ui";
import {
  getMaterials,
  addMaterial,
  updateMaterial,
  deleteMaterial,
} from "../../api/materials.instance";
import AddProductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModal";

function List() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(false);

  // *********************************

  const [data, setData] = useState({
    designation: "",
    quantity: 0,
    disponibility: false,
  });

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getMaterials().then((resp) => {
      setMaterials(resp);
      setLoading(false);
    });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const closeModal = () => {
    if (innerLoading) return;
    setData({
      designation: "",
      quantity: "",
      disponibility: "",
    });
    setModalOpen(false);
    setInnerLoading(false);
  };

  const closeUpdate = () => {
    if (innerLoading) return;
    setSelected(null);
    setUpdateOpen(false);
    setInnerLoading(false);
  };

  const handleConfirm = async () => {
    if (innerLoading) return;
    if (Object.values(data).includes("")) {
      alert("Veuillez remplire le formulaire ! ");
      return;
    }
    if (data.quantity < 1) {
      alert("Veuillez saisir une valeur valide");
      return;
    }
    setInnerLoading(true);
    try {
      console.log(data);
      await addMaterial({
        designation: data.designation,
        quantity: data.quantity,
        disponibility: data.disponibility,
      });
      const auxMaterials = await getMaterials();
      setMaterials([...auxMaterials]);
      closeModal();
    } catch (err) {
      console.error(err);
      let message = err?.response?.data?.message;
      alert(message);
      setInnerLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (innerLoading) return;
    if (Object.values(selected).includes("")) {
      alert("Veuillez remplire le formulaire ! ");
      return;
    }
    if (selected.price < 1) {
      alert("Veuillez saisir une valeur valide");
      return;
    }
    setInnerLoading(true);
    try {
      await updateMaterial(selected["_id"], {
        designation: selected.designation,
        quantity: selected.quantity,
        disponibility: selected.disponibility,
      });
      const auxMaterials = await getMaterials();
      setMaterials([...auxMaterials]);
      closeUpdate();
    } catch (err) {
      console.error(err);
      let message = err?.response?.data?.message;
      alert(message);
      setInnerLoading(false);
    }
  };

  const handleDelete = async () => {
    if (innerLoading) return;
    setInnerLoading(true);
    try {
      await deleteMaterial(selected["_id"]);
      const auxMaterials = await getMaterials();
      setMaterials([...auxMaterials]);
      closeUpdate();
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
        title="Tout les materiaux"
        cta={{
          title: "Ajouter une matière première",
          onClick: (_) => {
            setModalOpen(true);
          },
        }}
        columns={[
          {
            title: "Désignation",
            dataIndex: "designation",
          },
          {
            title: "Quantité",
            dataIndex: "quantity",
          },
          {
            title: "Disponibilité",
            dataIndex: "disponibility",
          },
        ]}
        bulkData={materials.map((material) => {
          return {
            ...material,
            disponibility: material.disponibility ? (
              <Badge type="success">Disponible</Badge>
            ) : (
              <Badge type="danger">Indisponible</Badge>
            ),
          };
        })}
        rowClick={(material) => {
          console.log({ ...material });
          setSelected({
            ...material,
            disponibility: material?.disponibility?.props?.type != "danger",
          });
          setUpdateOpen(true);
        }}
      />
      <AddProductModal
        modalOpen={modalOpen}
        closeModal={closeModal}
        handleConfirm={handleConfirm}
        data={data}
        setData={setData}
        innerLoading={innerLoading}
      />
      <UpdateProductModal
        modalOpen={updateOpen}
        closeModal={closeUpdate}
        handleConfirm={handleUpdate}
        handleDelete={handleDelete}
        data={selected}
        setData={setSelected}
        innerLoading={innerLoading}
      />
    </>
  );
}

export default List;
