interface BetweenUsProps {
  label: string;
  text: string;
}

export default function BetweenUs({ label, text }: BetweenUsProps) {
  return (
    <div className="bg-caution border-l-4 border-orange px-6 py-4 rounded mb-6">
      <div className="font-oswald text-lg text-orange mb-2">
        Between Us — {label}
      </div>
      <p className="text-txt2 leading-relaxed">{text}</p>
    </div>
  );
}
