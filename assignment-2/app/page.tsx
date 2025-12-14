"use client"
import { useMemo, useState } from "react"
import { SummaryCard } from "./components/dashboard/SummaryCard"
import { TransactionTable } from "./components/dashboard/TransactionTable"
import { MOCK_DATA } from "@/lib/constants"


const page = () => {

  const [filter, setFilter] = useState<"all" | "income" | "expense">("all")

  const { summary, sortedTransactions } = useMemo(() => {
    const sorted = [...MOCK_DATA.transactions].sort(
      (a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    const totals = sorted.reduce(
      (acc, curr) => {
        if
          (curr.type === "income") acc.income += curr.amount;
        else
          acc.expense += curr.amount;
        return acc
      },
      { income: 0, expense: 0}
    )

    const filtered = filter === "all" ? sorted: sorted.filter((t) => t.type === filter )

    return {
      summary: {
        income: totals.income,
        expense: totals.expense,
        balance: totals.income - totals.expense
      },
      sortedTransactions: filtered,
    }
  }, [filter])
  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-indigo-500/30">

      {/* bg ambienec */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"/>

        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[100px] mix-blend-screen "/>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 lg:p-10">

        {/* header */}
        <header className="flex flex-col md:flex-row items-start md:items-center mb-10 gap-4">
          {/* left */}
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-slate-400">
              Transaction Dashboard
            </h1>
            <p className="text-slate-500 text-md mt-1">
              Welcome back, Paraphol Puangpee
            </p>
          </div>

        </header>

      {/* dashboard */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            title="Total Balance"
            amount={summary.balance}
            type="balance"/>
          <SummaryCard
            title="Income"
            amount={summary.income}
            type="income"/>
          <SummaryCard
            title="Expenses"
            amount={summary.expense}
            type="expense"/>
        </div>

        <TransactionTable
          transactions={sortedTransactions}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      </div>

    </div>
  )
}
export default page