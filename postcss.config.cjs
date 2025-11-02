module.exports = {
  plugins: {
    "postcss-import": {
      path: ["./", "./node_modules"],
    },
    "@tailwindcss/postcss": {}, // ✅ new plugin for Tailwind v4
    autoprefixer: {},
  },
};
