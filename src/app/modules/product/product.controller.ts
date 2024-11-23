import { Request, Response } from "express";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
    try {
        const { product: productData } = req.body;

        const result = await ProductServices.createProductIntoDB(productData);

        res.status(200).json({
            message: "Book created successfully",
            success: true,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message,
        });
    }
};

export const productControllers = {
    createProduct,
};
