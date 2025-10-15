"use client";
import React, { useState } from 'react';

const OrganizationNamePage = () => {
  const [organizationName, setOrganizationName] = useState('');

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Organization Name
        </h1>
        <input
          type="text"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          placeholder="Organization Name"
          className="w-full bg-[var(--color-bg-dark)] border border-[var(--color-border-secondary)] text-[var(--color-text-primary)] rounded-lg p-4 text-center focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
    </main>
  );
};

export default OrganizationNamePage;