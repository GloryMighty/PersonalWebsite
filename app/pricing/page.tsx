"use client"

import React from 'react';

// Pricing tier interface for type safety and clarity
interface PricingTier {
  name: string;
  price: string;
  priceSubtext?: string;
  features: string[];
  highlight?: boolean;
}

export default function PricingPage() {
  // Define pricing tiers with clear, concise descriptions
  const pricingTiers: PricingTier[] = [
    {
      name: "Basic plan",
      price: "$299",
      priceSubtext: "starting from",
      features: [
        "Initial Consultation",
        "Design and production",
        "Hosting on Your server",
        "Simple website design",
        "2 Languages"
      ]
    },
    {
      name: "Advanced plan",
      price: "$599",
      priceSubtext: "starting from",
      features: [
        "Ready to go solution",
        "3 Updates a year for FREE",
        "1 year FREE hosted server included",
        "SEO with 3 FREE blog posts a month",
        "Better digital presence",
        "Advanced website design",
        "3 Languages"
      ],
      highlight: true
    },
    {
      name: "VIP Experience",
      price: "$999",
      priceSubtext: "starting from",
      features: [
        "Everything in Advanced, PLUS",
        "Premium domain included",
        "Unlimited updates on request", 
        "AI Chatbot Integration",
        "Superior website design",
        "Users authentication",
        "2 years of hosting",
        "Up to 5 Languages"
      ],
      highlight: true
    }
  ];

  // FAQ section data
  const faqData = [
    {
      question: "What's included in each plan?",
      answer: "Each plan offers progressively more comprehensive services, from basic website design to full-featured, custom solutions with ongoing support."
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Absolutely! We offer flexible upgrades to ensure your website grows with your business needs."
    },
    {
      question: "Do you offer custom solutions?",
      answer: "Yes, we provide tailored solutions beyond our standard plans. Contact us to discuss your specific requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-black py-12 px-4 pt-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 
          text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Pricing Plans
        </h1>

        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.name} 
              className={`
                bg-white dark:bg-gray-800 
                rounded-xl shadow-lg p-5 
                transform transition-all duration-300
                ${tier.highlight ? 'scale-105 border-2 border-blue-500' : 'hover:scale-105'}
              `}
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                {tier.name}
              </h2>
              <p className="text-2xl font-bold mb-4 text-blue-600">
                {tier.price} {tier.priceSubtext && <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">{tier.priceSubtext}</span>}
              </p>
              <ul className="space-y-2 mb-4">
                {tier.features.map((feature) => (
                  <li 
                    key={feature} 
                    className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                  >
                    <svg 
                      className="w-4 h-4 mr-2 text-blue-500" 
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
                  w-full py-2 rounded-full text-sm
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

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 
            text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md"
              >
                <h3 className="text-lg font-semibold mb-2 text-blue-600">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4 
            text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Need a Custom Solution?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Every business is unique. If our standard plans don't quite fit your needs, 
            we're happy to create a tailored solution that perfectly matches your requirements.
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full text-sm transition duration-300 ease-in-out"
            onClick={() => window.open('https://wa.me/358451333953', '_blank')}
          >
            Contact for Custom Pricing
          </button>
        </div>

        {/* Footer with Copyright */}
        <footer className="container mx-auto px-4 py-8 text-center">
          <div className="content-glass p-4 backdrop-blur-md max-w-xl mx-auto">
            <p className="tech-text text-sm text-blue-200">
              2025 Viacheslav Mamatov. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
