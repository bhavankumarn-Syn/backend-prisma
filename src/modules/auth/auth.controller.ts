// controllers/auth.controller.ts

import { Request, Response } from "express";
import * as authService from "./auth.service.ts";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await authService.getAllUsers();

    res.json(users);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await authService.getUser(Number(req.params.id));

    res.json(user);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await authService.updateUser(
      Number(req.params.id),
      req.body
    );

    res.json(user);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {

    const user = await authService.deleteUser(
      Number(req.params.id)
    );

    

    res.json(user);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(
      req.body,
      req.file?.filename
    );

    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);

    res.json(result);
  } catch (err: any) {
    res.status(401).json({
      error: err.message,
    });
  }
};

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    const user = await authService.uploadAvatar(
      Number(req.params.id),
      req.file?.filename
    );

    res.json(user);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const logout = (req: Request, res: Response) => {
  res.json({
    message: "Logout successful",
  });
};