import React from 'react';
import Link from 'next/link';
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
    { label: 'Contact', href: '/contact' }
  ];

  // Define language options
  const languageOptions: ToolbarItem[] = [
    { label: 'EN', href: '?lang=en' },
    { label: 'RU', href: '?lang=ru' },
    { label: 'TR', href: '?lang=tr' }
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
      
      {/* Language Selector and Hire Me Button */}
      <div className="flex items-center space-x-2">
        {/* Hire Me Button */}
        <Link 
          href="https://forms.gle/B5GSjnyMojGHasZRA" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600/60 hover:bg-blue-700/70 text-white 
                     px-3 py-1 rounded-full text-sm 
                     transition-all duration-300 ease-in-out"
        >
          HIRE ME
        </Link>

        {/* Language Options */}
        <div className="flex space-x-1">
          {languageOptions.map((lang) => (
            <NavigationButton 
              key={lang.label} 
              label={lang.label} 
              href={lang.href} 
              variant="small" 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
