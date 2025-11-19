import { Router } from "express";
import {GoogleGeminiRespose} from "../controller/googleGeminiResponse.js";

const router = Router();

router.post("/chat", GoogleGeminiRespose);

export default router;