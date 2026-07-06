// import express from "express";
// import { prisma } from "../src/config/prisma.ts";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { upload } from "../src/middleware/upload.ts"

// const router = express.Router();

// router.get("/all", async (req, res) => {
//      console.log("GET /api/Authusers/all called");
//     try {
//         const users = await prisma.authUser.findMany();

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


// router.post(
//   "/:id/avatar",
//   upload.single("avatar"),
//   async (req, res) => {
//     try {
//       const id = Number(req.params.id);

//       if (!req.file) {
//         return res.status(400).json({
//           error: "No file uploaded",
//         });
//       }

//       const user = await prisma.authUser.update({
//         where: { id },
//         data: {
//           avatar: req.file.filename,
//         },
//       });
//       console.log('req.file', req.file);

//       res.json({
//         message: "Avatar uploaded successfully",
//         user,
//       });
//     } catch (error) {
//       console.error(error);

//       res.status(500).json({
//         error: "Upload failed",
//       });
//     }
//   }
// );


// // get specific user details
// router.get("/:id", async (req, res) => {
//     try {
//         const id = Number(req.params.id);

//         const user = await prisma.authUser.findUnique({
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

// router.put("/:id", async (req, res) => {
//     try {
//         const id = Number(req.params.id);

//         const { name, email } = req.body;

//         const user = await prisma.authUser.update({
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

// router.post(
//     "/register", 
//     upload.single("avatar"),
//     async (req, res) => {
//     try {
        

//         const { name, email, password, role } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await prisma.authUser.create({
//             data: {
//                 name,
//                 email,
//                 password: hashedPassword,
//                 role,
//                 avatar: req.file ? req.file.filename : null,
//             }
//         });

//         res.status(201).json(user);

//     } catch (error:any) {
//         console.error(error);

//         res.status(500).json({
//             error: "Create failed",
//             message: error.message,
//         });
//     }
// });

// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if email and password were provided
//         if (!email || !password) {
//             return res.status(400).json({
//                 error: "Email and password are required",
//             });
//         }
//         // Find the user by email
//         const user = await prisma.authUser.findUnique({
//             where: {
//                 email,
//             },
//         });
//         // User not found
//         if (!user) {
//             return res.status(401).json({
//                 error: "Invalid email or password",
//             });
//         }
//         // Compare passwords
//         const isValid = await bcrypt.compare(password, user.password!);

//         if (!isValid) {
//             return res.status(401).json({
//                 error: "Invalid email or password",
//             });
//         }

//         const token = jwt.sign(
//             {
//                 id: user.id,
//                 email: user.email,
//                 role: user.role,
//             },
//             process.env.JWT_SECRET!,
//             {
//                 expiresIn: "1d",
//             }
//         );

       

//         // Login successful
//         res.status(200).json({
//             message: "Login successful",
//             user: {
//                 id: user.id,
//                 email: user.email,
//                 name: user.name,
//                 token,
//             },
//         });

//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             error: "Login failed",
//         });
//     }
// });
// router.post("/logout", (req, res) => {
//     res.status(200).json({
//         message: "Logout successful",
//     });
// });

// export default router;