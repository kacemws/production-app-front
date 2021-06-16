import instance from "./axios";

export const getOrders = async () => {
  try {
    const answ = await instance.get("/v1/cart");
    if (answ.status === 204) return [];
    return answ?.data?.carts;
  } catch (err) {
    throw err;
  }
};

export const updateOrder = async (id, body) => {
  try {
    const answ = await instance.put(`/v1/cart/${id}`, body);
    return answ?.data;
  } catch (err) {
    throw err;
  }
};
