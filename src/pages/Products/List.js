import React, { useEffect, useState } from "react";
import PageMarkup from "../Page";
import ThemedSuspense from "../../components/ThemedSuspense";
import { Badge } from "@windmill/react-ui";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../api/products.instance";
import AddProductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModal";

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

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getProducts().then((resp) => {
      setProducts(resp);
      setLoading(false);
    });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

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
      await updateProduct(selected["_id"], {
        code: selected.code,
        designation: selected.designation,
        price: selected.price,
        mesureUnit: selected.mesureUnit,
        disponibility: selected.disponibility,
      });
      const auxProducts = await getProducts();
      setProducts([...auxProducts]);
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
      await deleteProduct(selected["_id"]);
      const auxProducts = await getProducts();
      setProducts([...auxProducts]);
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
        rowClick={(product) => {
          console.log({ ...product });
          setSelected({
            ...product,
            disponibility: product?.disponibility?.props?.type != "danger",
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
