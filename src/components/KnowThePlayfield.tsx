interface KeyArea {
  id: string;
  name: string;
  location_hint: string;
  why_it_matters: string;
}

interface KnowThePlayfieldProps {
  keyAreas: KeyArea[];
}

export default function KnowThePlayfield({ keyAreas }: KnowThePlayfieldProps) {
  if (!keyAreas || keyAreas.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="font-oswald text-3xl text-gold mb-6">Know the Playfield</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {keyAreas.map((area) => (
          <div key={area.id} className="bg-card border border-border rounded-lg px-5 py-4">
            <a
              className="callout-link font-oswald text-lg block mb-1"
              data-callout-id={area.id}
            >
              {area.name}
            </a>
            <p className="text-txt2 text-sm italic mb-2">{area.location_hint}</p>
            <p
              className="text-txt2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: area.why_it_matters }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
