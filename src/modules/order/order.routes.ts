// routes/auth.routes.ts

import express from "express";
import * as orderController from "./order.controller.ts";
import { upload } from "../../middleware/upload.ts";
import { Role } from "../../../src/generated/prisma/enums.ts";
import { authorize } from "../../middleware/auth.ts";


const router = express.Router();

router.get("/all", orderController.getAllOrders);

router.get("/:order_id", orderController.getOrder);

router.get("/add", orderController.newOrder);

router.put("/:order_id", orderController.updateOrder);

router.delete("/:order_id", authorize(Role.ADMIN), orderController.deleteOrder);


export default router;