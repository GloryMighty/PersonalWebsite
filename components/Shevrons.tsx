import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// Interface defines the props for the Shevrons component
interface ShevronProps {
  direction: 'up' | 'down' | 'left' | 'right';
  onClick?: () => void;
  className?: string;
  size?: number;
  variant?: 'single' | 'triple';
}

/**
 * Shevrons Component
 * 
 * Renders chevrons (up, down, left, or right) with optional click handler and multiple display variants
 * Uses Lucide React icons for clean, consistent icon rendering
 * 
 * @param direction - Specifies the chevron direction
 * @param onClick - Optional click event handler
 * @param className - Optional additional CSS classes
 * @param size - Optional icon size (default: 24)
 * @param variant - Display variant: single or triple chevrons (default: single)
 */
const Shevrons: React.FC<ShevronProps> = ({ 
  direction, 
  onClick, 
  className = '', 
  size = 24,
  variant = 'single'
}) => {
  // Select the appropriate chevron icon based on direction
  const ChevronIcon = direction === 'up' ? ChevronUp : 
                      direction === 'down' ? ChevronDown :
                      direction === 'left' ? ChevronLeft : 
                      ChevronRight;

  // Render single or triple chevrons
  const renderChevrons = () => {
    const isVertical = direction === 'up' || direction === 'down';
    const isReverse = direction === 'down' || direction === 'right';

    if (variant === 'single') {
      return (
        <div 
          onClick={onClick} 
          className={`cursor-pointer transition-transform hover:scale-110 ${className}`}
          role="button"
          aria-label={`Chevron ${direction}`}
        >
          <ChevronIcon 
            size={size} 
            strokeWidth={1.5}
          />
        </div>
      );
    }

    // Triple chevron variant
    return (
      <div 
        onClick={onClick} 
        className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center cursor-pointer group ${className}`}
        role="button"
        aria-label={`Chevron ${direction} arrow`}
      >
        {[1, 2, 3].map((index) => (
          <ChevronIcon 
            key={index}
            size={size} 
            strokeWidth={1.5}
            className={`
              transition-all duration-300 
              ${isVertical 
                ? (isReverse ? '-mt-4' : '-mb-4') 
                : (isReverse ? '-ml-4' : '-mr-4')
              }
              ${index === 3 ? 'opacity-100' : 'opacity-50'}
              ${isVertical 
                ? (isReverse ? 'group-hover:translate-y-1' : 'group-hover:-translate-y-1')
                : (isReverse ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1')
              }
              group-hover:opacity-75
            `}
          />
        ))}
      </div>
    );
  };

  return renderChevrons();
};

export default Shevrons;
