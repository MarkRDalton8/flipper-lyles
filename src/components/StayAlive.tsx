import { SurvivalItem } from "@/lib/types";

interface StayAliveProps {
  items: SurvivalItem[];
}

export default function StayAlive({ items }: StayAliveProps) {
  return (
    <div className="bg-safe border border-teal rounded-lg px-6 py-5 mb-6">
      <h4 className="font-oswald text-xl text-teal mb-4">Stay Alive Out There</h4>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx}>
            <strong className="text-teal">→ {item.title}:</strong>{" "}
            <span className="text-txt2">{item.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
