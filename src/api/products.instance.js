import instance from "./axios";

export const getProducts = async () => {
  try {
    const answ = await instance.get("/v1/product");
    if (answ.status === 204) return [];
    return answ?.data?.products;
  } catch (err) {
    throw err;
  }
};

export const addProduct = async (body) => {
  try {
    const answ = await instance.post(`/v1/product`, body);
    return answ?.data;
  } catch (err) {
    throw err;
  }
};
