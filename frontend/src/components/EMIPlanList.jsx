export default function EMIPlanList({ plans, selectedPlan, onSelect }) {
  return (
    <div className="space-y-3">
      {plans.map((plan) => (
        <div
          key={plan.id}
          onClick={() => onSelect(plan)}
          className={`p-4 rounded-lg border cursor-pointer flex justify-between items-center ${
            selectedPlan?.id === plan.id
              ? "border-blue-600 bg-blue-50"
              : "border-gray-200 bg-white"
          }`}
        >
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
      ))}
    </div>
  );
}