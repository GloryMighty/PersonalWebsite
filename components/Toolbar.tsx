import React from 'react';
import NavigationButton from './NavigationButton';

// Interface to define the structure of toolbar items
interface ToolbarItem {
  label: string;
  href: string;
}

// Toolbar component with semi-glass effect and responsive design
const Toolbar: React.FC = () => {
  // Define main navigation items
  const mainNavItems: ToolbarItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Cases', href: '/cases' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    // Semi-glass effect using Tailwind CSS backdrop blur and transparency
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 
      w-[90%] max-w-4xl mx-auto 
      bg-white/30 dark:bg-black/30 
      backdrop-blur-lg 
      rounded-full 
      shadow-lg 
      border border-gray-200/20 dark:border-gray-800/20
      flex justify-between items-center 
      px-4 py-2 mt-4">
      
      {/* Main Navigation Buttons */}
      <div className="flex space-x-2">
        {mainNavItems.map((item) => (
          <NavigationButton 
            key={item.label} 
            label={item.label} 
            href={item.href} 
          />
        ))}
      </div>
      
    </div>
  );
};

export default Toolbar;
