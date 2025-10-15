import React from "react";

interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: () => void;
  children: React.ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({
  pressed,
  onPressedChange,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onPressedChange}
      className={`p-2 rounded-md cursor-pointer border transition-all duration-150 
        ${pressed ? "bg-border-secondary text-white border-bg-gray" : "bg-bg text-text-primary border-border-secondary"} 
        hover:bg-btn-primary hover:border-btn-secondary
        active:scale-95`}
    >
      {children}
    </button>
  );
};

export default Toggle;
