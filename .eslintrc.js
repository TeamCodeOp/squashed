
/**
 * These rules enforce the airbnb Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/airbnb/javascript
 */
module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "extends": "airbnb",
  "rules": {
    "func-names": ["error", "never"],
    "no-console": "off",
    "react/prefer-stateless-function": "off",
    "comma-dangle": "off",
    "no-unused-vars": "off"
  }
}