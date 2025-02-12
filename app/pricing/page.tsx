import React from 'react';

// Pricing tier interface for type safety and clarity
interface PricingTier {
  name: string;
  price: string;
  features: string[];
  highlight?: boolean;
}

export default function PricingPage() {
  // Define pricing tiers with clear, concise descriptions
  const pricingTiers: PricingTier[] = [
    {
      name: 'Starter',
      price: 'Free',
      features: [
        'Basic Portfolio Showcase',
        'Single Project Highlight',
        'Contact Form Access'
      ]
    },
    {
      name: 'Professional',
      price: '$9.99/month',
      features: [
        'Full Portfolio Display',
        'Multiple Project Highlights',
        'Advanced Contact Options',
        'Performance Analytics'
      ],
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Custom Pricing',
      features: [
        'Unlimited Projects',
        'Custom Domain Integration',
        'Priority Support',
        'Advanced Reporting'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 
          text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Pricing Plans
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.name} 
              className={`
                bg-white dark:bg-gray-800 
                rounded-xl shadow-lg p-6 
                transform transition-all duration-300
                ${tier.highlight ? 'scale-105 border-2 border-blue-500' : 'hover:scale-105'}
              `}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                {tier.name}
              </h2>
              <p className="text-3xl font-bold mb-6 text-blue-600">
                {tier.price}
              </p>
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <li 
                    key={feature} 
                    className="flex items-center text-gray-600 dark:text-gray-300"
                  >
                    <svg 
                      className="w-5 h-5 mr-2 text-blue-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                className={`
                  w-full py-3 rounded-full 
                  transition-all duration-300
                  ${tier.highlight 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'}
                `}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
