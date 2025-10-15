import React from "react";
import Image from "next/image";
import Payment from "@/components/payment/Payment";
import OrderSummary from "@/components/OrderSummary";
import { Lock, ShieldCheck } from "lucide-react";

const PaymentPage = () => {
  return (
    <div className="bg-bg min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/credit-card.svg"
            alt="Secure Checkout Icon"
            width={28}
            height={28}
          />
          <h1 className="text-2xl text-text-primary font-bold">
            Secure Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Payment />
          </div>

          <div>
            <OrderSummary />
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-8 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <ShieldCheck size={16} className="text-green-600" /> SSL Secured
          </span>
          <span className="flex items-center gap-1">
            <Lock size={16} className="text-blue-500" /> 256-bit Encryption
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
