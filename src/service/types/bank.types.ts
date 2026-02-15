export interface Bank {
  _id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBankPayload {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface UpdateBankPayload {
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
}
