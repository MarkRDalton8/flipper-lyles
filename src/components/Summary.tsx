import ModePills from "./ModePills";
import { ModePill, PlayfieldCallout } from "@/lib/types";
import { renderDescription } from "@/lib/renderDescription";

interface SummaryProps {
  text: string;
  modes: ModePill[];
  callouts?: PlayfieldCallout[];
}

export default function Summary({ text, modes, callouts = [] }: SummaryProps) {
  return (
    <div className="bg-card border border-border rounded-lg px-6 py-5 mb-8">
      <div className="font-oswald text-lg text-gold mb-3">The 30-Second Summary</div>

      <div
        className="text-txt2 text-[1.02rem] leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: renderDescription(text, callouts) }}
      />

      <div className="pt-3 border-t border-border">
        <div className="meta mb-2">Modes & Multiballs You'll Hear About:</div>
        <ModePills modes={modes} />
      </div>
    </div>
  );
}
