import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const orderProduct = async (req: Request, res: Response) => {
    try {
        const { order } = req.body;
        
        const result = await OrderServices.orderProductIntoDB(order);

        res.status(200).json({
            message: "Order created successfully",
            status: true,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Failed to create an order",
            success: false,
            error: {
                name: error.name,
                errors: error.errors,
                stack: error.stack,
            },
        });
    }
};

export const orderControllers = {
    orderProduct,
};
