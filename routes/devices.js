import { Router } from "express";
import { 
  getAllDevices, 
  getDeviceById, 
  createDevice,
  updateDevice,
  deleteDevice
} from "../services/deviceService.js";

const router = Router();

router.get("/", async (req, res) => {
  const devices = await getAllDevices();
  res.json(devices);
});

router.get("/:id", async (req, res) => {
  const device = await getDeviceById(req.params.id);
  res.json(device);
});

router.post("/", async (req, res) => {
  const device = await createDevice(req.body);
  res.json(device);
});

router.patch("/:id", async (req, res) => {
  const updated = await updateDevice(req.params.id, req.body);
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const deleted = await deleteDevice(req.params.id);
  res.json(deleted);
});

export default router;
