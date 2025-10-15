"use client";
import React from "react";
import { Lock, ShieldCheck } from "lucide-react";

const Payment = () => {
  return (
    <div className="bg-bg-dark text-text-primary p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
      <p className="text-text-primary/80 text-sm mb-6">
        Enter your payment details securely. All transactions are encrypted.
      </p>

      <form className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-primary/90"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            placeholder="your.email@example.com"
            className="mt-1 block w-full px-3 py-2 border border-border-secondary rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
          />
          <p className="text-xs  mt-1">Receipt will be sent to this email</p>
        </div>

        <div>
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-text-primary/90"
          >
            Card Number *
          </label>
          <input
            type="text"
            id="card-number"
            placeholder="1234 5678 9012 3456"
            className="mt-1 block w-full px-3 py-2 border border-border-secondary rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
          />
        </div>

        <div>
          <label
            htmlFor="cardholder-name"
            className="block text-sm font-medium text-text-primary/90"
          >
            Cardholder Name *
          </label>
          <input
            type="text"
            id="cardholder-name"
            placeholder="John Doe"
            className="mt-1 block w-full px-3 py-2 border border-border-secondary rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label
              htmlFor="expiry-date"
              className="block text-sm font-medium text-text-primary/90"
            >
              Expiry Date *
            </label>
            <input
              type="text"
              id="expiry-date"
              placeholder="MM/YY"
              className="mt-1 block w-full px-3 py-2 border border-border-secondary rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-text-primary/90"
            >
              CVV *
            </label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              className="mt-1 block w-full px-3 py-2 border border-border-secondary rounded-md shadow-sm focus:outline-none focus:ring-brand-red focus:border-brand-red"
            />
          </div>
        </div>

        <div className="flex items-center text-sm text-text-secondary">
          <Lock size={14} className="mr-2 text-btn-primary" />
          Your payment information is encrypted and secure
        </div>

        <button
          type="submit"
          className="w-full bg-btn-primary hover:bg-btn-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ShieldCheck size={18} />
          Pay R120.00
        </button>
      </form>
    </div>
  );
};

export default Payment;
