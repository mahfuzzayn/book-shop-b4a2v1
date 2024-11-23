import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";
import validator from "validator";

const productSchema = new Schema<TProduct>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            validate: {
                validator: (value: string) => {
                    return validator.isAlphanumeric(value);
                },
                message: "{VALUE} should only contain alphanumeric characters",
            },
        },
        author: {
            type: String,
            required: [true, "Author is required"],
            validate: {
                validator: (value: string) => {
                    return validator.isAlpha(value);
                },
                message: "{VALUE} should only contain alpha characters",
            },
        },
        price: {
            type: Number,
            required: [true, "Price of the Product (Book) is required"],
            validate: {
                validator: (value: number) => value > 0,
                message: "{VALUE} should only contain positive number",
            },
        },
        category: {
            type: String,
            enum: [
                "Fiction",
                "Science",
                "SelfDevelopment",
                "Poetry",
                "Religious",
            ],
            required: [true, "Category of the Product (Book) is required"],
            validate: {
                validator: (value: string) => {
                    return validator.isAlpha(value);
                },
                message: "{VALUE} should only contain alpha characters",
            },
        },
        description: {
            type: String,
            required: [true, "Description of the Product (Book) is required"],
        },
        quantity: {
            type: Number,
            required: [true, "Quantity of the Product (Book) is required"],
            validate: {
                validator: (value: number) => value > 0,
                message: "{VALUE} should only contain positive number",
            },
        },
        inStock: {
            type: Boolean,
            required: [
                true,
                "inStock status of the Product (Book) is required",
            ],
        },
    },
    {
        timestamps: true,
    }
);

export const Product = model<TProduct>("Product", productSchema);
