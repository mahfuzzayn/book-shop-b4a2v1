import { Product } from "./product.model";
import { TProduct } from "./product.interface";

const createProductIntoDB = async (productData: TProduct) => {
    const result = await Product.create(productData);
    return result;
};

const getAllProductsFromDB = async (searchTerm: any) => {
    const result = await Product.find({
        $or: [
            { title: { $regex: searchTerm, $options: "i" } },
            { author: { $regex: searchTerm, $options: "i" } },
            { category: { $regex: searchTerm, $options: "i" } },
        ],
    });
    return result;
};

const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findById(id);
    return result;
};

const updateProductFromDB = async (
    id: string,
    updatedProduct: Partial<TProduct>
) => {
    console.log(updatedProduct);

    const result = await Product.updateOne(
        {
            _id: id,
        },
        {
            $set: updatedProduct,
        }
    );

    return result;
};

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductFromDB,
};
