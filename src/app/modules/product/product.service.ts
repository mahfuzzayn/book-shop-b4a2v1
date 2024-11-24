import { Product } from "./product.model";
import { TProduct } from "./product.interface";
import mongoose from "mongoose";

const validateObjectId = (id: string): boolean => {
    return mongoose.Types.ObjectId.isValid(id);
};

const createProductIntoDB = async (productData: TProduct) => {
    const result = await Product.create(productData);
    return result;
};

const getAllProductsFromDB = async (searchTerm: any) => {
    if (!searchTerm) {
        const result = await Product.find();
        return result;
    } else {
        const result = await Product.find({
            $or: [
                { title: { $regex: searchTerm, $options: "i" } },
                { author: { $regex: searchTerm, $options: "i" } },
                { category: { $regex: searchTerm, $options: "i" } },
            ],
        });
        return result;
    }
};

const getSingleProductFromDB = async (id: string) => {
    if (!validateObjectId(id)) {
        const error = new Error("The provided ID is invalid");
        error.name = "InvalidID";
        throw error;
    }

    const result = await Product.findById(id);

    if (!result) {
        const error = new Error(
            "Failed to retrieve the book. The provided ID does not match any existing book."
        );
        error.name = "SearchError";
        throw error;
    }

    return result;
};

const updateProductFromDB = async (
    id: string,
    updatedProduct: Partial<TProduct>
) => {
    let isChangeValid: boolean = true;

    if (!validateObjectId(id)) {
        const error = new Error("The provided ID is invalid");
        error.name = "InvalidID";
        throw error;
    }

    const product = await Product.findById(id);

    if (!product) {
        throw new Error("No product found with the provided ID.");
    }

    for (const key in updatedProduct) {
        if (updatedProduct[key as keyof Partial<TProduct>] === product[key as keyof TProduct]) {
            isChangeValid = false;
        }
    }

    if (!isChangeValid) {
        return { message: "No modifications detected; the product remains unchanged." };
    }

    const result = await Product.updateOne(
        {
            _id: id,
        },
        {
            $set: updatedProduct,
        }
    );

    if (!result.modifiedCount) {
        const error = new Error(
            "Failed to update the book. The provided ID does not match any existing book."
        );
        error.name = "SearchError";
        throw error;
    }

    return result;
};

const updateProductAfterOrderFromDB = async (
    id: string,
    quantity: number,
    productInDB: TProduct
) => {
    const result = await Product.findByIdAndUpdate(id, {
        $inc: { quantity: -quantity },
        $set: {
            inStock:
                productInDB.quantity - quantity <= 0
                    ? false
                    : productInDB.inStock,
        },
    });

    return result;
};

const deleteProductFromDB = async (id: string) => {
    const result = await Product.deleteOne({ _id: id });
    return result;
};

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductFromDB,
    updateProductAfterOrderFromDB,
    deleteProductFromDB,
};
