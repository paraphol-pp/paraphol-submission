import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import transactionsRouter from "./routes/transactions";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/assignment1_db"

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Transaction API is running" });
})

// routes
app.use("/api/transactions", transactionsRouter);

async function start(){
  await connectDB(MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`Server running at : http://localhost:${PORT}`)
  })
}

start().catch(console.error)