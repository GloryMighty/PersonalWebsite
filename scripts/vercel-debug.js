// Vercel Deployment Quick Diagnostic
const fs = require('fs');
const path = require('path');

console.log('Vercel Deployment Diagnostic');
console.log('----------------------------');

// Check critical files
const criticalFiles = [
  'package.json',
  'tailwind.config.js',
  'postcss.config.js',
  'app/globals.css',
  'vercel.json'
];

criticalFiles.forEach(file => {
  const fullPath = path.resolve(__dirname, '../', file);
  try {
    fs.accessSync(fullPath);
    console.log(`✅ ${file} exists`);
  } catch (error) {
    console.log(`❌ ${file} is missing`);
  }
});

// Quick Tailwind CSS check
try {
  const globalCss = fs.readFileSync(path.resolve(__dirname, '../app/globals.css'), 'utf8');
  const tailwindImports = [
    '@tailwind base',
    '@tailwind components',
    '@tailwind utilities'
  ];
  
  tailwindImports.forEach(imp => {
    console.log(`${imp} import:`, globalCss.includes(imp) ? '✅ Found' : '❌ Missing');
  });
} catch (error) {
  console.error('Error checking globals.css:', error);
}

// Environment Variables
console.log('\nEnvironment Variables:');
const envVars = [
  'NEXT_PUBLIC_VERCEL_DEPLOYMENT',
  'GEMINI_API_KEY',
  'GEMINI_MODEL'
];

envVars.forEach(varName => {
  console.log(`${varName}:`, process.env[varName] || 'Not Set');
});

console.log('\nDiagnostic Complete.');
