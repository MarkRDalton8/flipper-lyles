interface StatPipsProps {
  value: number; // 1-5
  color: "red" | "blue" | "teal" | "gold";
}

const colorClasses = {
  red: "bg-red",
  blue: "bg-blue",
  teal: "bg-teal",
  gold: "bg-gold",
};

export default function StatPips({ value, color }: StatPipsProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((pip) => (
        <div
          key={pip}
          className={`w-3 h-3 rounded-sm border border-border ${
            pip <= value ? colorClasses[color] : "bg-transparent"
          }`}
        />
      ))}
    </div>
  );
}
