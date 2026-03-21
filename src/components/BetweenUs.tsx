import { renderDescription } from "@/lib/renderDescription";
import { PlayfieldCallout } from "@/lib/types";

interface BetweenUsProps {
  label: string;
  text: string;
  callouts?: PlayfieldCallout[];
}

export default function BetweenUs({ label, text, callouts = [] }: BetweenUsProps) {
  return (
    <div className="bg-caution border-l-4 border-orange px-6 py-4 rounded mb-6">
      <div className="font-oswald text-lg text-orange mb-2">
        Between Us — {label}
      </div>
      <p
        className="text-txt2 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: renderDescription(text, callouts) }}
      />
    </div>
  );
}
