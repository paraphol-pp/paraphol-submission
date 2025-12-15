import { Schema, model, Document } from "mongoose";

export type TransactionType = "income" | "expense";

export interface TransactionDocument extends Document {
  type: TransactionType;
  amount: number;
  description?: string;
  date: Date;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<TransactionDocument>(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    description: {
      type: String
    },
    date: {
      type: Date,
      required: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }     
);

export const Transaction = model<TransactionDocument>(
  "Transaction",transactionSchema
);
