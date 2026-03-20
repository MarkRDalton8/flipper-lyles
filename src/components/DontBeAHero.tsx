import { SkipItem } from "@/lib/types";

interface DontBeAHeroProps {
  items: SkipItem[];
}

export default function DontBeAHero({ items }: DontBeAHeroProps) {
  return (
    <div className="bg-danger border border-red rounded-lg px-6 py-5 mb-6">
      <h4 className="font-oswald text-xl text-red mb-4">Don't Be a Hero</h4>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx}>
            <strong className="text-red">⚠ {item.title}:</strong>{" "}
            <span className="text-txt2">{item.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
