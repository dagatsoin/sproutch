var path = require("path");

var config = {
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, "../src"),
  ],
  resolver: {
    extraNodeModules: {
      "@babel/runtime": path.resolve(__dirname, "node_modules/@babel/runtime"),
      "@sproutch/ui": path.resolve(__dirname, "../src"),
      "expo": path.resolve(__dirname, "node_modules/expo"),
      "expo-linear-gradient": path.resolve(__dirname, "node_modules/expo-linear-gradient"),
      "lodash.merge": path.resolve(__dirname, "node_modules/lodash.merge"),
      "react": path.resolve(__dirname, "node_modules/react"),
      "reactxp": path.resolve(__dirname, "node_modules/reactxp"),
      "react-native": path.resolve(__dirname, "node_modules/react-native"),
      "react-native-svg": path.resolve(__dirname, "node_modules/react-native-svg")
    }
  }
}
module.exports = config;