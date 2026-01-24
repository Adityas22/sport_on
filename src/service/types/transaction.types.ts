export interface TransactionItem {
  productId: string;
  qty: number;
}

export interface CreateTransactionPayload {
  paymentProof: File;
  purchasedItems: TransactionItem[];
  totalPayment: number;
  customerName: string;
  customerContact: string;
  customerAddress: string;
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
