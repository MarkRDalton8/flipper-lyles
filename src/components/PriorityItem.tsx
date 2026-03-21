import { Priority, PlayfieldCallout } from "@/lib/types";
import DifficultyTag from "./DifficultyTag";
import { renderDescription } from "@/lib/renderDescription";

interface PriorityItemProps {
  priority: Priority;
  callouts?: PlayfieldCallout[];
}

const rankColors = {
  1: "bg-gold text-bg",
  2: "bg-orange text-bg",
  3: "bg-teal text-bg",
  4: "bg-blue text-bg",
};

export default function PriorityItem({ priority, callouts = [] }: PriorityItemProps) {
  return (
    <div className="flex gap-4 mb-4">
      {/* Rank Circle */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-oswald font-bold text-lg ${
          rankColors[priority.rank]
        }`}
      >
        {priority.rank}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="font-oswald text-lg mb-1 flex items-center gap-2 flex-wrap">
          {priority.title}{" "}
          <DifficultyTag difficulty={priority.difficulty} />
        </h4>
        <p
          className="text-txt2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderDescription(priority.description, callouts) }}
        />
      </div>
    </div>
  );
}
