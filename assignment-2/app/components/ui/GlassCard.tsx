interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className = ""}: GlassCardProps) => (
  <div className={`bg-white/3 backdrop-blur-xl border border-white/5 shadow-2xl rounded-3xl ${className}`}>{children}</div>
)