import { prisma } from "../../config/prisma.ts"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface OrderData {
    name: string;
    desc: string;
}

export const getAllOrders = async () => {
  return prisma.orders.findMany();
};

export const getOrder = async (order_id: string) => {
  return prisma.orders.findUnique({
    where: {
      order_id,
    },
  });
};


export const newOrder = async (data : OrderData) => {
  return prisma.orders.create({
    data: {
      name: data.name,
      desc: data.desc,
    },
  });
};


export const updateOrder = async (order_id: string, data : OrderData) => {

    return prisma.orders.update({
        where: { order_id },
        data: {
            name: data.name,
            desc: data.desc
        }
    });
  
};

export const deleteOrder = async (order_id: string) => {
  
    return prisma.orders.delete({
        where: { order_id }
    });
};