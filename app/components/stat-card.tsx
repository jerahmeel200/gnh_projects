type StatCardProps = {
  label: string;
  value: number;
  tone?: "neutral" | "success";
};

export function StatCard({ label, value, tone = "neutral" }: StatCardProps) {
  const palette =
    tone === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : "border-slate-200 bg-slate-50 text-slate-900";

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${palette}`}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
