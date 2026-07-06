// // routes/userRoutes.ts

// import express from "express";
// import { prisma } from "../src/config/prisma.ts";
// import { authorize } from "../src/middleware/auth.ts";
// import { Role } from "../src/generated/prisma/enums.ts";

// const router = express.Router();


// router.get("/all", async (req, res) => {
//      console.log("GET /api/orders/all called");
//     try {
//         const orders = await prisma.orders.findMany();

//         res.json(orders);
//     } catch (error : any) {
//         console.error(error);
//         console.error("Prisma error:", error);

//         res.status(500).json({
//             error: "Failed to fetch all orders",
//             message: error.message
//         });

//         // res.status(500).json({
//         //     error: "Failed to fetch all USERS users"
//         // });
//     }
// });

// // get specific order details
// router.get("/:order_id", async (req, res) => {
//     console.log("GET /api/orders/:order_id called", req.params.order_id);
//     try {
//         const order_id = req.params.order_id;

//         const order = await prisma.orders.findUnique({
//             where: { order_id }
//         });

//         res.json(order);
//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             error: "Failed to fetch orders"
//         });
//     }
// });
// // add new order
// router.post("/add", async (req, res) => {
//     try {

//         const { name, desc } = req.body;

//         const order = await prisma.orders.create({
//             data: {
//                 name,
//                 desc 
//             }
//         });

//         res.status(201).json(order);

//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             error: "Create failed"
//         });
//     }
// });
// // update user
// router.put("/:order_id", async (req, res) => {
//     try {
//         const order_id = req.params.order_id;

//         const { name, desc } = req.body;

//         const order = await prisma.orders.update({
//             where: { order_id },
//             data: {
//                 name,
//                 desc
//             }
//         });

//         res.json(order);

//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             error: "order Update failed"
//         });
//     }
// });

// // Delete order (ADMIN only)
// router.delete("/:order_id", authorize(Role.ADMIN), async (req, res) => {
//     try {
//         const order_id = String(req.params.order_id);

//         await prisma.orders.delete({
//             where: { order_id }
//         });

//         res.json({
//             message: "order Deleted Successfully"
//         });

//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             error: "order Delete failed"
//         });
//     }
// });


// export default router;