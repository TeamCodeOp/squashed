/**
 * These rules enforce the airbnb Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/airbnb/javascript
 */
module.exports = {
  "extends": "airbnb",
  "rules": {
    "func-names": ["error", "never"],
    "no-console": 0,
    "react/prefer-stateless-function": [<enabled>, { "ignorePureComponents": <ignorePureComponents> }],
  }
}