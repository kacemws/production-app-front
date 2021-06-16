import instance from "./axios";

export const getVendors = async () => {
  try {
    const answ = await instance.get("/v1/vendor");
    if (answ.status === 204) return [];
    return answ?.data?.vendors;
  } catch (err) {
    throw err;
  }
};

export const addVendor = async (body) => {
  try {
    const answ = await instance.post(`/v1/vendor/`, body);
    return answ?.data;
  } catch (err) {
    throw err;
  }
};
