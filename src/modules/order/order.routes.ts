// routes/order.routes.ts

import express from "express";
import * as orderController from "./order.controller.ts";
import { Role } from "../../../src/generated/prisma/enums.ts";
import { authorize } from "../../middleware/auth.ts";


const router = express.Router();

router.get("/all", orderController.getAllOrders);

// Static routes must be declared before the "/:order_id" param route,
// otherwise a request to "/add" is captured by "/:order_id".
router.post("/add", orderController.newOrder);

router.get("/:order_id", orderController.getOrder);

router.put("/:order_id", orderController.updateOrder);

router.delete("/:order_id", authorize(Role.ADMIN), orderController.deleteOrder);


export default router;