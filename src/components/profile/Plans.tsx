"use client";

import React from "react";
import { Award } from "lucide-react";

const Plans: React.FC = () => {
  return (
    <div className="mt-10 space-y-4" id="plans">
      <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
        <Award className="w-5 h-5 text-text-primary" />
        <span>Your Plan</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Plan */}
        <div className="bg-bg border border-border-secondary relative overflow-hidden rounded-xl p-6 text-center">
          <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold text-text-primary bg-bg-gray rounded-full">
            Current Plan
          </span>
          <h2 className="text-xl font-semibold text-text-primary mb-1">Free Plan</h2>
          <p className="text-sm text-text-secondary mb-4">
            Basic access with limited idea uploads and no analytics.
          </p>
          <div className="text-3xl font-bold text-text-primary mb-1">R0</div>
          <p className="text-xs text-text-secondary mb-6">per month</p>
          <button
            disabled
            className="w-full px-4 py-2 border border-text-secondary rounded-md text-gray-500 cursor-not-allowed"
          >
            Active
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-bg border border-border-secondary relative overflow-hidden rounded-xl p-6 text-center  transition-all">
          <h2 className="text-xl font-semibold text-text-primary mb-1">Pro Plan</h2>
          <p className="text-sm text-text-secondary mb-4">
            Unlock unlimited uploads, access analytics, and gain exposure boosts.
          </p>
          <div className="text-3xl font-bold text-text-primary mb-1">R99</div>
          <p className="text-xs text-text-secondary mb-6">per month</p>
          <a
            href="/payment"
            className="inline-block bg-btn-primary w-full px-4 py-2 border border-border-primary hover:bg-btn-primary-hover rounded-md  transition"
          >
            Upgrade
          </a>
        </div>

        {/* Premium Plan */}
        <div className="bg-bg border border-border relative overflow-hidden rounded-xl p-6 text-center hover:border-primary transition-all">
          <h2 className="text-xl font-semibold text-text-primary mb-1">Premium Plan</h2>
          <p className="text-sm text-text-secondary mb-4">
            Get featured placement, early access to new tools, and exclusive events.
          </p>
          <div className="text-3xl font-bold text-text-primary mb-1">R199</div>
          <p className="text-xs text-text-secondary mb-6">per month</p>
          <a
            href="/payment"
            className="inline-block bg-btn-primary w-full px-4 py-2 border border-border-primary rounded-md text-primary font-medium hover:bg-primary hover:bg-btn-primary-hover transition"
          >
            Upgrade
          </a>
        </div>
      </div>
    </div>
  );
};

export default Plans;
