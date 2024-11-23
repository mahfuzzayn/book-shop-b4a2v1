import { Product } from "../product/product.model";
import { ProductServices } from "../product/product.service";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const orderProductIntoDB = async (orderData: TOrder) => {
    const { product: productId, quantity, totalPrice } = orderData;

    const productInDB = await ProductServices.getSingleProductFromDB(productId);

    if (!productInDB) {
        throw new Error("Product not found");
    }

    if (productInDB.quantity < quantity) {
        throw new Error("Insufficient stock available");
    }

    // Checks if order totalPrice is correct
    if (totalPrice > productInDB.price * quantity) {
        throw new Error(
            "The total price provided exceeds the calculated price for this order"
        );
    } else if (totalPrice !== productInDB.price * quantity) {
        throw new Error(
            "The total price provided is insufficient for this order"
        );
    }

    const updatedProduct = await ProductServices.updateProductAfterOrderFromDB(
        productId,
        quantity,
        productInDB
    );

    if (!updatedProduct) {
        throw new Error("Error updating product stock");
    }

    const result = await Order.create(orderData);

    return result;
};

export const OrderServices = {
    orderProductIntoDB,
};
