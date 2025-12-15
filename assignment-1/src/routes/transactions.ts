import { Router, Request, Response } from "express";
import { Transaction } from "../models/Transaction";

const router = Router();

// Create
router.post("/", async (req: Request, res: Response) => {
  try {
    const { type, amount, description, date } = req.body

    const tx = await Transaction.create({
      type, amount, description, date: new Date(date)
    })

    res.status(201).json(tx);

  }catch (error){
    res.status(400).json({
      message: "fail create transaction"
    })
  }
});


// Read (all)
router.get("/", async (_req: Request, res: Response) => {
  const list = await Transaction.find({ deletedAt: null}).sort({ date: -1})
  .exec();

  res.json(list)
  })

// Read (one)
router.get("/:id", async (req: Request, res: Response) => {
  const tx = await Transaction.findById(req.params.id).exec();

  if (!tx || tx.deletedAt){
    return res.status(404).json({
      message: "Transaction not found"
    })
  }
  
  res.json(tx)
})

// Update
router.patch("/:id", async (req: Request, res: Response) => {
  const updates: any = {...req.body};

  if (updates.date) {
    updates.date = new Date(updates.date);
  }

  const tx = await Transaction.findOneAndUpdate(
    { _id: req.params.id, deletedAt: null},
    updates,
    { new: true }
  ).exec();

  if (!tx) {
    return res.status(404).json({
      message: "Transaction not found"
    })
  }

  res.json(tx)
})

// Delete (soft delete)
router.delete("/:id", async (req: Request, res: Response) => {
  const tx = await Transaction.findOneAndUpdate(
    {_id: req.params.id, deletedAt: null},
    {deletedAt: new Date()},
    {new: true}
  ).exec();

  if (!tx){
    return res.status(404).json({
      message: "Transaction not found"
    })
  }

  res.json({ success: true });
})

// Restore
router.post("/:id/restore", async (req: Request, res: Response) => {
  const tx = await Transaction.findByIdAndUpdate(
    req.params.id,
    { deletedAt: null},
    { new: true }
  ).exec();

  if (!tx) {
    return res.status(404).json({
      message: "Transaction not found"
    })
  }

  res.json(tx)
})
export default router;