import { BallPlan as BallPlanType } from "@/lib/types";
import PriorityItem from "./PriorityItem";

interface BallPlanProps {
  plan: BallPlanType;
}

export default function BallPlan({ plan }: BallPlanProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
      {/* Header Bar */}
      <div className="bg-card2 px-6 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-oswald text-xl">{plan.title}</h3>
        <span className="font-mono text-sm bg-bg px-3 py-1 rounded border border-border">
          BALL {plan.ball_number}
        </span>
      </div>

      {/* Priority Items */}
      <div className="px-6 py-6">
        {plan.priorities.map((priority, idx) => (
          <PriorityItem key={idx} priority={priority} />
        ))}
      </div>
    </div>
  );
}
