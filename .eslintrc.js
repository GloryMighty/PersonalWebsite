module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    // Disable specific rules or adjust as needed
    'react-hooks/exhaustive-deps': 1, // 1 = warn
    'react/no-unescaped-entities': 0, // 0 = off
    'react/display-name': 0, // 0 = off
    'react-hooks/rules-of-hooks': 2, // 2 = error
  },
  overrides: [
    {
      files: ['./app/page.tsx', './components/ConstellationBackground.tsx'],
      rules: {
        'react-hooks/exhaustive-deps': 1 // 1 = warn
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
};
