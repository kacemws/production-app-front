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
