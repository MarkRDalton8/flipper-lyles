import { SurvivalItem, PlayfieldCallout } from "@/lib/types";
import { renderDescription } from "@/lib/renderDescription";

interface StayAliveProps {
  items: SurvivalItem[];
  callouts?: PlayfieldCallout[];
}

export default function StayAlive({ items, callouts = [] }: StayAliveProps) {
  return (
    <div className="bg-safe border border-teal rounded-lg px-6 py-5 mb-6">
      <h4 className="font-oswald text-xl text-teal mb-4">Stay Alive Out There</h4>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx}>
            <strong className="text-teal">→ {item.title}:</strong>{" "}
            <span
              className="text-txt2"
              dangerouslySetInnerHTML={{ __html: renderDescription(item.description, callouts) }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
