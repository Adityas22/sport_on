import { Category } from "./category.types";

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: Category;
  stock: number;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
