import { useLocation, useNavigate, Link } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, variant, plan } = location.state || {};

  if (!product || !variant || !plan) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center mt-10">
        <p className="text-gray-600">No order details found.</p>
        <Link to="/" className="text-blue-600 underline mt-2 inline-block">
          Go back to shop
        </Link>
      </div>
    );
  }

  const handlePay = () => {
    alert("This is a demo checkout — payment integration not implemented.");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Confirm & Pay</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex gap-4">
          <img
            src={variant.image}
            alt={product.name}
            className="w-20 h-20 object-contain"
          />
          <div>
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">
              {variant.storage} {variant.color ? `- ${variant.color}` : ""}
            </p>
            <p className="font-bold mt-1">
              ₹{Number(variant.price).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="font-semibold mb-3">Selected EMI Plan</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">
              ₹{Number(plan.monthlyAmount).toLocaleString("en-IN")} x {plan.tenureMonths} months
            </p>
            {Number(plan.cashback) > 0 && (
              <p className="text-sm text-green-600">
                Additional cashback of ₹{Number(plan.cashback).toLocaleString("en-IN")}
              </p>
            )}
          </div>
          <span className="text-sm text-gray-600">
            {Number(plan.interestRate) === 0 ? "0% interest" : `${plan.interestRate}% interest`}
          </span>
        </div>
      </div>

      <button
        onClick={handlePay}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
      >
        Pay & Confirm Order
      </button>

      <button
        onClick={() => navigate(-1)}
        className="w-full mt-3 text-gray-600 py-2 text-sm underline"
      >
        Go back
      </button>
    </div>
  );
}