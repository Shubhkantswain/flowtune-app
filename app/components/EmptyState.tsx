// components/EmptyState.tsx
import React from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  message = "Try a different search term or check your spelling.",
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 text-center text-gray-400">
      {icon ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mb-4 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
      )}
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{message}</p>
    </div>
  );
};

export default EmptyState;
