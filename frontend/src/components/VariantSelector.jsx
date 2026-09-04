export default function VariantSelector({ variants, selectedVariant, onSelect }) {
  return (
    <div className="flex gap-3 mb-4 flex-wrap">
      {variants.map((v) => (
        <button
          key={v.id}
          onClick={() => onSelect(v)}
          className={`px-4 py-2 rounded-lg border text-sm ${
            selectedVariant?.id === v.id
              ? "border-blue-600 bg-blue-50 text-blue-700"
              : "border-gray-300 text-gray-700"
          }`}
        >
          {v.storage} {v.color ? `- ${v.color}` : ""}
        </button>
      ))}
    </div>
  );
}