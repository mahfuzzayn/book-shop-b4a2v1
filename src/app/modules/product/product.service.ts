import { Product } from "./product.model";
import { TProduct } from "./product.interface";

const createProductIntoDB = async (productData: TProduct) => {
    const result = await Product.create(productData);
    return result;
};

const getAllProductsFromDB = async (searchTerm: any) => {
    const result = await Product.find({
        $or: [
            { title: { $regex: searchTerm, $options: "i"}},
            { author: { $regex: searchTerm, $options: "i"}},
            { category: { $regex: searchTerm, $options: "i"}}
        ]
    });
    return result;
};

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
};
