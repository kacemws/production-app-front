import instance from "./axios";

export const getCustomers = async () => {
  try {
    const answ = await instance.get("/v1/client");
    if (answ.status === 204) return [];
    return answ?.data?.clients;
  } catch (err) {
    throw err;
  }
};
