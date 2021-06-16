import instance from "./axios";

export const getSales = async () => {
  try {
    const answ = await instance.get("/v1/sale");
    if (answ.status === 204) return [];
    return answ?.data?.sales;
  } catch (err) {
    throw err;
  }
};

export const updateSale = async (id, body) => {
  try {
    const answ = await instance.put(`/v1/sale/${id}`, body);
    return answ?.data;
  } catch (err) {
    throw err;
  }
};
