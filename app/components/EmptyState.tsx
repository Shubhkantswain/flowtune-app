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
    <div className=" flex flex-col items-center justify-center mt-10 text-center text-white">
        {icon}
      <h2 className="text-2xl font-medium">{title}</h2>
      <p className="text-sm mt-1">{message}</p>
    </div>
  );
};

export default EmptyState;
