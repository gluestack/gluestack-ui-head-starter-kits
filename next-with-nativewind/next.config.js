/** @type {import('next').NextConfig} */

const {withGluestackUI}= require("@gluestack/ui-next-adapter");

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["nativewind", "react-native-css-interop"],
};

module.exports= withGluestackUI(nextConfig);

// /** @type {import('next').NextConfig} */
// const { withGluestackUI } = require("@gluestack/ui-next-adapter");
// const withPlugins = require("next-compose-plugins");
// const { withExpo } = require("@expo/next-adapter");

// const withTM = require("next-transpile-modules")([
//   "lucide-react-native",
//   "@legendapp/motion",
//   "@expo/html-elements",
//   // "nativewind",
//   // "react-native-css-interop",
// ]);

// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   reactStrictMode: true,
//   images: {
//     domains: ["gluestack.io"],
//     dangerouslyAllowSVG: true,
//   },
//   webpack5: true,
//   webpack: (config) => {
//     config.resolve.fallback = { fs: false };

//     config.resolve.alias = {
//       ...(config.resolve.alias || {}),
//       // Transform all direct `react-native` imports to `react-native-web`
//       "react-native$": "react-native-web",
//     };

//     return config;
//   },
// };

// module.exports = withPlugins([[withTM], [withExpo]], {
//   // Append the default value with md extensions
//   pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
//   ...withGluestackUI(nextConfig),
//   transpilePackages: [
//     "nativewind",
//     "react-native-css-interop",
//     "@expo/html-elements",
//   ],
// });
