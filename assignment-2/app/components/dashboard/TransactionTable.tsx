import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Transaction } from '../../types';
import { formatCurrency, formatDate } from '@/lib/utils';

interface TransactionTableProps {
  transactions: Transaction[];
  filter: 'all' | 'income' | 'expense';
  setFilter: (filter: 'all' | 'income' | 'expense') => void;
}

export const TransactionTable = ({ transactions, filter, setFilter }: TransactionTableProps) => {
  return (
    <GlassCard className="min-h-125 flex flex-col">
      <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-white">Transactions</h2>
        
        <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
          {(['all', 'income', 'expense'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                filter === f 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-300'
              } capitalize cursor-pointer`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">

          <thead>
            <tr className="text-xs text-slate-500 border-b border-white/5">
              <th className="px-6 py-4 font-medium uppercase tracking-wider">Transaction</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider hidden sm:table-cell">Date</th>
              <th className="px-6 py-4 font-medium uppercase tracking-wider text-right">Amount</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {transactions.map((item) => (
              <tr key={item.id} 
                className="group hover:bg-white/2 transition-colors border-b border-white/5 last:border-0"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {item.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                    </div>
                    {/* text */}
                    <span className="font-medium text-slate-200 group-hover:text-white transition-colors">
                      {item.description}
                    </span>

                  </div>

                </td>
                
                {/* date */}
                <td className="px-6 py-4 text-slate-400 hidden sm:table-cell">
                  {formatDate(item.date)}
                </td>

                {/* amount */}
                <td className={`px-6 py-4 text-right font-semibold ${
                  item.type === 'income' ? 'text-emerald-400' : 'text-slate-200'
                }`}>
                  {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </GlassCard>
  );
};