import instance from "./axios";

export const getProductions = async () => {
  try {
    const answ = await instance.get("/v1/production");
    if (answ.status === 204) return [];
    return answ?.data?.productions;
  } catch (err) {
    throw err;
  }
};

export const addProduction = async (body) => {
  try {
    const answ = await instance.post(`/v1/production`, body);
    return answ?.data;
  } catch (err) {
    throw err;
  }
};
