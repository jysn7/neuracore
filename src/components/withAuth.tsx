"use client";

import { useSession } from '@/hooks/useSession';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options = { requireAuth: true }
) {
  return function WithAuthComponent(props: P) {
    const { loading, error } = useSession(options.requireAuth);

    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500">
            An error occurred: {error.message}
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}