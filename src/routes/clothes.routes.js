import { Router } from 'express';
import {
    createClothes,
    deleteClothes,
    getSClothesById,
    getCloths,
    updateClothes 
} from "../controllers/clothes.controller.js";

const clothesRoutes = Router();

clothesRoutes.get("/", getCloths);

clothesRoutes.get("/:id", getSClothesById);

clothesRoutes.post("/", createClothes);

clothesRoutes.put("/:id", updateClothes);

clothesRoutes.delete("/:id", deleteClothes);


export default clothesRoutes;