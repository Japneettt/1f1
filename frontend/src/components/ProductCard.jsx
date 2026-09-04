import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const firstVariant = product.variants?.[0];

  const imageUrl = firstVariant?.image
    ? `${import.meta.env.VITE_API_URL}${firstVariant.image}`
    : "";

  return (
    <Link
      to={`/products/${product.slug}`}
      className="block bg-white rounded-xl shadow hover:shadow-lg transition p-4"
    >
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-48 object-contain mb-3"
      />

      <h2 className="text-lg font-semibold">
        {product.name}
      </h2>

      <p className="text-sm text-gray-500">
        {product.brand}
      </p>

      {firstVariant && (
        <p className="mt-2 font-bold text-gray-900">
          ₹{Number(firstVariant.price).toLocaleString("en-IN")}
        </p>
      )}
    </Link>
  );
}