import { Router } from 'express';
import {
    createClothes,
    deleteClothes,
    getSClothesById,
    getClothes,
    updateClothes 
} from "../controllers/clothes.controller.js";

const clothesRoutes = Router();

clothesRoutes.get("/", getClothes);

clothesRoutes.get("/:id", getSClothesById);

clothesRoutes.post("/", createClothes);

clothesRoutes.put("/:id", updateClothes);

clothesRoutes.delete("/:id", deleteClothes);


export default clothesRoutes;