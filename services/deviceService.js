import axios from "axios";

const API_URL = "http://localhost:8081/devices";

export async function getAllDevices() {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function getDeviceById(id) {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
}

export async function createDevice(device) {
  const { data } = await axios.post(API_URL, device);
  return data;
}

export async function updateDevice(id, device) {
  const { data } = await axios.patch(`${API_URL}/${id}`, device);
  return data;
}

export async function deleteDevice(id) {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
}
