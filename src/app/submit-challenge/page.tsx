import React from 'react';
import { Star } from 'lucide-react';
import SubmitChallengeForm from '@/components/submit-challenge/SubmitChallengeForm';

const SubmitChallengePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <Star className="text-red-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Submit a Challenge</h1>
        </div>
        
        {/* Form Block */}
        <SubmitChallengeForm />
      </div>
    </div>
  );
};

export default SubmitChallengePage;