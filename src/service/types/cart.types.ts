import { Product } from "./product.types";

export interface CartItem {
  product: Product;
  qty: number;
}
