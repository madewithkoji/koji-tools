import * as chokidar from 'chokidar';
import fsService from './tools/fs.service';
import writeConfig from './tools/writeConfig';

// noinspection JSUnusedGlobalSymbols
export default function watch() {
  // Generate a base config
  writeConfig();

  // Watch the .koji directory from a node_modules directory
  const files = fsService.kojiConfigFiles
    .filter((path) => (path.endsWith('koji.json') || path.includes('.koji')) && !path.includes('.koji-resources'));

  // Note: Polling is used by default in the container via
  // the CHOKIDAR_USEPOLLING=1 env that is set in the container
  const watcher = chokidar.watch(files);

  watcher
    .on('error', (error) => console.error(`[@withkoji/vcc] Watcher error: ${error}`))
    .on('change', () => {
      writeConfig();
    })
    .on('ready', () => {
      const watched = watcher.getWatched();
      Object.keys(watched).map((path) => watched[path].map((file) => console.log(`[@withkoji/vcc] Watching ${path}/${file}`)));
    });
}
