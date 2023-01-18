module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        ecmaFeatures: {
            jsx: true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": ["warn", 4, { "SwitchCase": 1 }],
        "quotes": ["warn", "double"],
        "semi": ["error", "always"],
        "no-var": ["error"],
        "no-console": ["off"],
        "no-unused-vars": ["warn"],
        "no-mixed-spaces-and-tabs": ["warn"],
    }
};
