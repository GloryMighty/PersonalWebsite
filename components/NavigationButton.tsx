// Button for navigation across the site with the overall site stylistics
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface NavigationButtonProps {
  href: string;
  label?: string;
}

export default function NavigationButton({ href, label = 'Back' }: NavigationButtonProps) {
  return (
    <Link 
      href={href} 
      className="group flex items-center space-x-3 text-gray-300 hover:text-white 
                 transition-all duration-300 ease-in-out"
      aria-label={label}
    >
      <div className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm 
                    group-hover:bg-gray-700/60 border border-gray-700/50
                    transition-all duration-300 ease-in-out 
                    shadow-lg shadow-gray-900/20">
        <ArrowLeftIcon 
          className="h-5 w-5 text-gray-300 group-hover:text-white 
                     transition-all duration-300 ease-in-out" 
        />
      </div>
      <span className="text-sm font-medium bg-clip-text hover:text-transparent 
                     hover:bg-gradient-to-r from-white to-blue-200
                     transition-all duration-300 ease-in-out">
        {label}
      </span>
    </Link>
  );
}