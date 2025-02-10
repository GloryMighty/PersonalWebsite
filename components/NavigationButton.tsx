// Button for navigation across the site with the overall site stylistics
import Link from 'next/link';
import React from 'react';

// Define props interface with optional variant
interface NavigationButtonProps {
  label: string;
  href: string;
  variant?: 'default' | 'small' | 'back';
}

// NavigationButton component with flexible styling
const NavigationButton: React.FC<NavigationButtonProps> = ({ 
  label, 
  href, 
  variant = 'default' 
}) => {
  // Dynamic classes based on variant
  const baseClasses = "transition-all duration-300 ease-in-out";
  const variantClasses = {
    default: "px-4 py-2 rounded-full text-sm md:text-base hover:bg-gray-200/50 dark:hover:bg-gray-800/50",
    small: "px-2 py-1 rounded-full text-xs hover:bg-gray-200/30 dark:hover:bg-gray-800/30",
    back: "fixed top-4 left-4 z-50 group flex items-center space-x-3 text-gray-300 hover:text-white"
  };

  // Render different button styles based on variant
  if (variant === 'back') {
    return (
      <Link 
        href={href} 
        className={`${baseClasses} ${variantClasses.back}`}
        aria-label={label}
      >
        <div className="p-2 rounded-full bg-gray-800/30 backdrop-blur-sm 
                        group-hover:bg-gray-800/50 transition-all duration-300">
          {/* Back icon can be added here if needed */}
        </div>
        <span className="text-sm group-hover:text-white transition-colors">
          {label}
        </span>
      </Link>
    );
  }

  // Default and small variants
  return (
    <Link 
      href={href} 
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {label}
    </Link>
  );
};

export default NavigationButton;