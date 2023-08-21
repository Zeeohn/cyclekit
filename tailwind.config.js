/** @type {import('tailwindcss').Config} */

const generateColorClass = (variable) => {
  return ({ opacityValue }) =>
    opacityValue ? `${variable}, ${opacityValue}` : `${variable}`;
};

const textColor = {
  primary: generateColorClass("primary-color"),
  secondary: generateColorClass("secondary-color"),
  main: generateColorClass("main"),
  tertiary: generateColorClass("text-main"),
};

const backgroundColor = {
  primary: generateColorClass("primary-color"),
  secondary: generateColorClass("secondary-color"),
  main: generateColorClass("main"),
  tertiary: generateColorClass("text-main"),
};

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        textColor,
        backgroundColor,
      },
      fontFamily: {
        normalFont: ["DMSans", "helvetica"],
        mediumFont: ["DMSans-Medium", "helvetica"],
        boldFont: ["DMSans-Bold", "helvetica"],
      },
    },
  },
  plugins: [],
};
