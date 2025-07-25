/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{ts,tsx,js,jsx}",
      "./components/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          'tic-toc-toe': "url('/img.jpg')", 
        },
        fontFamily: {
          bitcount: ["var(--font-bitcount)"],
        },
      },
    },
    plugins: [],
  };
  