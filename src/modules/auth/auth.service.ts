// services/auth.service.ts
import { prisma } from "../../config/prisma.ts"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async () => {
  return prisma.authUser.findMany();
};

export const getUser = async (id: number) => {
  return prisma.authUser.findUnique({
    where: { id },
  });
};

export const updateUser = async (
  id: number,
  body: any
) => {
  return prisma.authUser.update({
    where: { id },
    data: {
      name: body.name,
      email: body.email,
    },
  });
};
export const deleteUser = async (id: number) => {
  return prisma.authUser.delete({
    where: { id },
  });
};

export const uploadAvatar = async (
  id: number,
  filename?: string
) => {
  if (!filename) {
    throw new Error("No file uploaded");
  }

  return prisma.authUser.update({
    where: { id },
    data: {
      avatar: filename,
    },
  });
};

export const register = async (
  body: any,
  avatar?: string
) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);

  return prisma.authUser.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role,
      avatar,
    },
  });
};

export const login = async (body: any) => {
  const user = await prisma.authUser.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const valid = await bcrypt.compare(
    body.password,
    user.password!
  );

  if (!valid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );

  return {
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    },
  };
};