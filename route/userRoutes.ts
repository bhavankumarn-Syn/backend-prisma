// // routes/userRoutes.ts

// import express from "express";
// import { prisma } from "../src/config/prisma.js";

// const router = express.Router();


// router.get("/all", async (req, res) => {
//      console.log("GET /api/users/all called");
//     try {
//         const users = await prisma.appUser.findMany();

//         res.json(users);
//     } catch (error : any) {
//         console.error(error);
//         console.error("Prisma error:", error);

//         res.status(500).json({
//             error: "Failed to fetch all users",
//             message: error.message
//         });

//         // res.status(500).json({
//         //     error: "Failed to fetch all USERS users"
//         // });
//     }
// });

// // get specific user details
// router.get("/:id", async (req, res) => { 
//     try {
//         const id = Number(req.params.id);

//         const user = await prisma.appUser.findUnique({
//             where: { id }
//         });

//         res.json(user);
//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             error: "Failed to fetch user"
//         });
//     }
// });
// // add new user
// router.post("/", async (req, res) => {
//     try {

//         const { name, email, password } = req.body;

//         const user = await prisma.appUser.create({
//             data: {
//                 name,
//                 email,
//                 password
//             }
//         });

//         res.status(201).json(user);

//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             error: "Create failed"
//         });
//     }
// });
// // update user
// router.put("/:id", async (req, res) => {
//     try {
//         const id = Number(req.params.id);

//         const { name, email } = req.body;

//         const user = await prisma.appUser.update({
//             where: { id },
//             data: {
//                 name,
//                 email
//             }
//         });

//         res.json(user);

//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             error: "Update failed"
//         });
//     }
// });
// // Delete user
// router.delete("/:id", async (req, res) => {
//     try {
//         const id = Number(req.params.id);

//         await prisma.appUser.delete({
//             where: { id }
//         });

//         res.json({
//             message: "Deleted Successfully"
//         });

//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             error: "Delete failed"
//         });
//     }
// });


// export default router;