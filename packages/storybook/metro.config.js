const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// The current project where metro is called from
const projectRoot = __dirname;

// The root of the mono repo where the node_modules are
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Only list the packages within your monorepo that your app uses. No need to add anything else.
// If your monorepo tooling can give you the list of monorepo workspaces linked
// in your app workspace, you can automate this list instead of hardcoding them.
const monorepoPackages = {
  '@sproutch/ui': path.resolve(monorepoRoot, 'packages/components/src'),
};

// 1. Watch the local app folder, and only the shared packages (limiting the scope and speeding it up)
// Note how we change this from `workspaceRoot` to `projectRoot`. This is part of the optimization!
config.watchFolders = [monorepoRoot];

if(config.resolver) {
  // Add the monorepo workspaces as `extraNodeModules` to Metro.
  // If your monorepo tooling creates workspace symlinks in the `node_modules` folder,
  // you can either add symlink support to Metro or set the `extraNodeModules` to avoid the symlinks.
  // See: https://facebook.github.io/metro/docs/configuration/#extranodemodules
  config.resolver.extraNodeModules = monorepoPackages;

  // 2. Let Metro know where to resolve packages and in what order
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(monorepoRoot, 'node_modules'),
  ];

  // Load fonts
 /*  config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (moduleName.startsWith('./vendor/react-native-vector-icons/Fonts/FontAwesome5_Brands.ttf')) {
      // Logic to resolve the module name to a file path...
      // NOTE: Throw an error if there is no resolution.
      return {
        filePaths: [path.resolve(monorepoRoot, 'node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome5_Brands.ttf')],
        type: "assetFiles",
      };
    }
    // Optionally, chain to the standard Metro resolver.
    return context.resolveRequest(context, moduleName, platform);
  } */

  // 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
  config.resolver.disableHierarchicalLookup = true;
}

module.exports = config;