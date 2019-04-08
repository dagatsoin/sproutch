var path = require("path");

var config = {
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, "../src"),
  ],
  resolver: {
    extraNodeModules: {
      "@sproutch/ui": path.resolve(__dirname, "../src"),
      "expo": path.resolve(__dirname, "node_modules/expo"),
      "lodash.merge": path.resolve(__dirname, "node_modules/lodash.merge"),
      "react": path.resolve(__dirname, "node_modules/react"),
      "reactxp": path.resolve(__dirname, "node_modules/reactxp"),
      "react-native": path.resolve(__dirname, "node_modules/react-native")
    }
  }
}
module.exports = config;