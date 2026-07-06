// src/server.ts

import express from "express";
import cors from "cors";

// import userRoutes from "../route/userRoutes.js";
// import authRoutes from "../route/authRoutes.js";
import authRoutes from "./modules/auth/auth.routes.ts";
import {authenticateToken} from "./middleware/auth.ts";
import ordersRoutes from "./modules/order/order.routes.ts";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);
// app.use(authenticateToken);

app.use("/api/orders", authenticateToken , ordersRoutes);
// app.use("/api/orders" , ordersRoutes);

app.use("/api/auth", authRoutes);

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});