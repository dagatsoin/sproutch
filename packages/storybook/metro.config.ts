import { getDefaultConfig } from 'expo/metro-config';
import path from 'path';

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(monorepoRoot);

// Only list the packages within your monorepo that your app uses. No need to add anything else.
// If your monorepo tooling can give you the list of monorepo workspaces linked
// in your app workspace, you can automate this list instead of hardcoding them.
const monorepoPackages = {
  '@sproutch/ui': path.resolve(monorepoRoot, 'packages/components'),
};

// 1. Watch the local app folder, and only the shared packages (limiting the scope and speeding it up)
// Note how we change this from `workspaceRoot` to `projectRoot`. This is part of the optimization!
config.watchFolders = [projectRoot, ...Object.values(monorepoPackages)];

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

  // 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
  config.resolver.disableHierarchicalLookup = true;
}
