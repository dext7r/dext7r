module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  plugins: [],
  rules: {
    "string-quotes": "double",
    "selector-class-pattern": ["^([a-z][a-z0-9]*)(_[a-z0-9]+)*$"],
  },
};
