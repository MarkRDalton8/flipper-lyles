import { ModePill } from "@/lib/types";

interface ModePillsProps {
  modes: ModePill[];
}

const pillConfig = {
  mb: { className: "bg-blue/20 text-blue border-blue" },
  md: { className: "bg-purple/20 text-purple border-purple" },
  ev: { className: "bg-gold/20 text-gold border-gold" },
  wiz: { className: "bg-orange/20 text-orange border-orange" },
};

export default function ModePills({ modes }: ModePillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {modes.map((mode, idx) => {
        const config = pillConfig[mode.type] || pillConfig.md; // Fallback to mode default
        return (
          <span
            key={idx}
            className={`px-3 py-1 text-xs font-mono border rounded-full ${config.className}`}
          >
            {mode.name}
          </span>
        );
      })}
    </div>
  );
}
