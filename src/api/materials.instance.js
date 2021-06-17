import instance from "./axios";

export const getMaterials = async () => {
  try {
    const answ = await instance.get("/v1/raw-material");
    if (answ.status === 204) return [];
    return answ?.data?.materials;
  } catch (err) {
    throw err;
  }
};

export const addMaterial = async (body) => {
  try {
    const answ = await instance.post(`/v1/raw-material`, body);
    return answ?.data;
  } catch (err) {
    throw err;
  }
};

export const updateMaterial = async (id, body) => {
  try {
    const answ = await instance.put(`/v1/raw-material/${id}`, body);
    return answ?.data;
  } catch (err) {
    throw err;
  }
};

export const deleteMaterial = async (id) => {
  try {
    const answ = await instance.delete(`/v1/raw-material/${id}`);
    return answ?.data;
  } catch (err) {
    throw err;
  }
};
