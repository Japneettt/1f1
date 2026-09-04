import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductBySlug } from "../api/productApi";
import VariantSelector from "../components/VariantSelector";
import EMIPlanList from "../components/EMIPlanList";

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [planError, setPlanError] = useState("");

  useEffect(() => {
    getProductBySlug(slug)
      .then((data) => {
        setProduct(data);
        setSelectedVariant(data.variants?.[0] || null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setSelectedPlan(null);
    setPlanError("");
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setPlanError("");
  };

  const handleProceed = () => {
    if (!selectedPlan) {
      setPlanError("Please select an EMI plan first.");
      return;
    }
    navigate("/checkout", {
      state: { product, variant: selectedVariant, plan: selectedPlan }
    });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="text-xs text-gray-400 mb-4">
        Shop on EMI &gt; Smart Phones &gt; {product.brand} &gt;{" "}
        <span className="text-gray-600">{product.name}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6">
          <span className="text-xs text-red-500 font-semibold">NEW</span>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mb-4">{selectedVariant?.storage}</p>
          <img
            src={selectedVariant?.image}
            alt={product.name}
            className="w-full h-64 object-contain"
          />
          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelect={handleVariantSelect}
          />

          {product.description && (
            <p className="text-sm text-gray-600 mt-4">{product.description}</p>
          )}

          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-medium">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <div className="mb-4">
            <p className="text-2xl font-bold">
              ₹{Number(selectedVariant?.price).toLocaleString("en-IN")}
            </p>
            {Number(selectedVariant?.mrp) > Number(selectedVariant?.price) && (
              <p className="text-gray-400 line-through">
                ₹{Number(selectedVariant?.mrp).toLocaleString("en-IN")}
              </p>
            )}
            <p className="text-sm text-gray-600 mt-1">EMI plans backed by mutual funds</p>
          </div>

          <EMIPlanList
            plans={selectedVariant?.emiPlans || []}
            selectedPlan={selectedPlan}
            onSelect={handlePlanSelect}
          />

          {planError && (
            <p className="text-sm text-red-600 mt-2">{planError}</p>
          )}

          <button
            onClick={handleProceed}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Proceed with Selected Plan
          </button>
        </div>
      </div>
    </div>
  );
}