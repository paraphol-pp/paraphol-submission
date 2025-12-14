import { Wallet, TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { formatCurrency } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  amount: number;
  type: "balance" | "income" | "expense";
}

export const SummaryCard = ({ title, amount, type }: SummaryCardProps) => {
  const styles = {
    balance: {
      text: "text-white",
      subtext: "text-blue-200/60",
      icon: Wallet,
      gradient: "from-blue-500/20 to-indigo-500/20",
    },
    income: {
      text: "text-emerald-400",
      subtext: "text-emerald-200/60",
      icon: TrendingUp,
      gradient: "from-emerald-500/20 to-teal-500/10",
    },
    expense: {
      text: "text-rose-400",
      subtext: "text-rose-200/60",
      icon: TrendingDown,
      gradient: "from-rose-500/20 to-pink-500/10",
    },
  };

  const current = styles[type];
  const Icon = current.icon;

  return (
    <GlassCard className="p-6 relative overflow-hidden group hover:bg-white/5 transition-all duration-500 cursor-pointer">
      <div
        className={`absolute inset-0 bg-linear-to-br ${current.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <Icon
              className={`w-6 h-6 ${
                type === "balance"
                  ? "text-blue-400"
                  : type === "income"
                  ? "text-emerald-400"
                  : "text-rose-400"
              }`}
            />
          </div>
          <button className="text-white/20 hover:text-white/50 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
        <div>
          <p className={`text-sm font-medium ${current.subtext} mb-1`}>
            {title}
          </p>
          <h3
            className={`text-2xl lg:text-3xl font-bold ${current.text} tracking-tight`}
          >
            {formatCurrency(amount)}
          </h3>
        </div>
      </div>
    </GlassCard>
  );
};
