// Product bisa berupa object lengkap atau hanya string ID
export interface ProductInTransaction {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  stock?: number;
  price?: number;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface TransactionItem {
  productId: string | ProductInTransaction; // Bisa string atau object
  qty: number;
}

export interface Transaction {
  _id: string;
  paymentProof: string;
  status: string;
  purchasedItems: TransactionItem[];
  totalPayment: number;
  customerName: string;
  customerContact: string;
  customerAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionPayload {
  paymentProof: File;
  purchasedItems: Array<{
    productId: string;
    qty: number;
  }>;
  totalPayment: number;
  customerName: string;
  customerContact: string;
  customerAddress: string;
}
