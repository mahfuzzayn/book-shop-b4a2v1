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
