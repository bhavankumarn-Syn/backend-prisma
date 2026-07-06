import { Request, Response } from "express";
import * as orderService from "./order.service.ts";

type OrderParams = {
  order_id: string;
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();

    res.json(orders);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};


export const getOrder = async (req: Request<OrderParams>, res: Response) => {
  try {
    const order_id = req.params.order_id
    const order = await orderService.getOrder(order_id);

    res.json(order);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const newOrder = async (req: Request, res: Response) => {
  try {
    
    const order = await orderService.newOrder(req.body);

    res.json(order);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const updateOrder = async (req: Request<OrderParams>, res: Response) => {
  try {
    
    const order = await orderService.updateOrder(req.params.order_id, req.body);

    res.json(order);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteOrder = async (req: Request<OrderParams>, res: Response) => {
  try {
    const order = await orderService.deleteOrder(req.params.order_id);

    res.json(order);
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
    });
  }
};