import React from "react";
import { CheckCircle } from "lucide-react";

const OrderSummary = () => {
  return (
    <div className="bg-bg-dark text-text-primary/90 p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Premium Membership</h3>
            <p className="text-sm text-gray-500">
              Access to exclusive challenges and features
            </p>
            <span className="text-xs font-medium bg-border-secondary text-text-primary/90 px-2 py-1 rounded-md mt-2 inline-block">
              Premium
            </span>
          </div>
        </div>

        <div className="border-t border-text-secondary/70 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary/90">Subtotal</span>
            <span>R120</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary/90">Tax</span>
            <span>R0.0</span>
          </div>
        </div>

        <div className="border-t border-text-secondary/90 pt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-brand-red">R120</span>
          </div>
        </div>
      </div>

      <div className="bg-bg p-4 rounded-lg mt-6">
        <h4 className="font-semibold mb-3">What's Included:</h4>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-center">
            <CheckCircle size={16} className="text-brand-red mr-2" /> Access to
            all premium challenges
          </li>
          <li className="flex items-center">
            <CheckCircle size={16} className="text-brand-red mr-2" /> Priority
            support
          </li>
          <li className="flex items-center">
            <CheckCircle size={16} className="text-brand-red mr-2" /> Exclusive
            networking events
          </li>
          <li className="flex items-center">
            <CheckCircle size={16} className="text-brand-red mr-2" /> Advanced
            analytics dashboard
          </li>
        </ul>
      </div>
      <p className="text-xs text-text-secondary mt-4">
        By completing this purchase, you agree to our Terms of Service and
        Privacy Policy
      </p>
    </div>
  );
};

export default OrderSummary;
