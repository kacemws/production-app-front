import instance from "./axios";

export const getRequests = async () => {
  try {
    const answ = await instance.get("/v1/supply-request");
    if (answ.status === 204) return [];
    return answ?.data?.requests;
  } catch (err) {
    throw err;
  }
};

export const addRequest = async (body) => {
  try {
    const answ = await instance.post(`/v1/supply-request`, body);
    return answ?.data;
  } catch (err) {
    throw err;
  }
};

export const updateRequest = async (id, body) => {
  try {
    const answ = await instance.put(`/v1/supply-request/${id}`, body);
    return answ?.data;
  } catch (err) {
    throw err;
  }
};
