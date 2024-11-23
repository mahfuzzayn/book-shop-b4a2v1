import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const orderProductIntoDB = async (orderData: TOrder) => {
    const { product, quantity } = orderData;

    const productInDB = await Product.findById(product);

    if (!productInDB) {
        throw new Error("Product not found");
    }

    if (productInDB.quantity < quantity) {
        throw new Error("Insufficient stock available");
    }

    const updatedProduct = await Product.findByIdAndUpdate(product, {
        $inc: { quantity: -quantity },
        $set: {
            inStock:
                productInDB.quantity - quantity <= 0
                    ? false
                    : productInDB.inStock,
        },
    });

    if (!updatedProduct) {
        throw new Error("Error updating product stock")
    }

    const result = await Order.create(orderData);
    
    return result;
};

export const OrderServices = {
    orderProductIntoDB,
};
