interface DifficultyTagProps {
  difficulty: "easy" | "medium" | "hard";
}

const tagConfig = {
  easy: {
    text: "You Got This",
    className: "bg-safe text-teal border-teal",
  },
  medium: {
    text: "Earnable",
    className: "bg-caution text-gold border-gold",
  },
  hard: {
    text: "Good Luck",
    className: "bg-danger text-red border-red",
  },
};

export default function DifficultyTag({ difficulty }: DifficultyTagProps) {
  const config = tagConfig[difficulty];

  return (
    <span
      className={`inline-block px-2 py-0.5 text-[0.65rem] font-mono uppercase tracking-wider border rounded ${config.className}`}
    >
      {config.text}
    </span>
  );
}
