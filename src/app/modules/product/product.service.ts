import { Product } from "./product.model";
import { TProduct } from "./product.interface";

const createProductIntoDB = async (productData: TProduct) => {
    const result = await Product.create(productData);
    return result;
};

export const ProductServices = {
    createProductIntoDB,
};
