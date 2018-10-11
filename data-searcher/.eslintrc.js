module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "allowShortCircuit": true,
        "allowTernary": true,
        "jsx-quotes": ["error", "prefer-single"],
        "jsx-first-prop-new-line": "never",
        "react/jsx-max-props-per-line": [1, { "maximum": 2, "when": "multiline" }],
        "react/require-default-props": [0, { forbidDefaultForRequired: true }],
        "react/prop-types": [0],
        "object-curly-newline": ["error", { "multiline": true }],
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
      }
};