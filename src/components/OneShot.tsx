import { renderDescription } from "@/lib/renderDescription";
import { PlayfieldCallout } from "@/lib/types";

interface OneShotProps {
  name: string;
  description: string;
  callouts?: PlayfieldCallout[];
}

export default function OneShot({ name, description, callouts = [] }: OneShotProps) {
  return (
    <div className="bg-card2 border-2 border-gold rounded-lg px-6 py-5 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🎯</span>
        <div className="font-oswald text-xl text-gold">
          The One Shot That Matters — {name}
        </div>
      </div>
      <p
        className="text-txt2 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: renderDescription(description, callouts) }}
      />
    </div>
  );
}
