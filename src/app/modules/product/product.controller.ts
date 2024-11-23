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
        // console.log(error);
        res.status(500).json({
            message: "Failed to create a product",
            success: false,
            error: {
                name: error.name,
                errors: error.errors,
                stack: error.stack,
            },
        });
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query;

        const result = await ProductServices.getAllProductsFromDB(searchTerm);

        res.status(200).json({
            message: "Books retrieved successfully",
            status: true,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Failed to get all products",
            success: false,
            error: {
                name: error.name,
                errors: error.errors,
                stack: error.stack,
            },
        });
    }
};

export const productControllers = {
    createProduct,
    getAllProducts
};
