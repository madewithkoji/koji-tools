import readDirectory from './readDirectory';
import findRootDirectory from './findRootDirectory';

// noinspection JSUnusedGlobalSymbols
export default (() => {
  let kojiConfigFiles;

  function refresh() {
    kojiConfigFiles = readDirectory(findRootDirectory())
      .filter((path) => (path.endsWith('koji.json') || path.includes('.koji')) && !path.includes('.koji-resources'));
  }

  refresh();

  // noinspection JSUnusedAssignment, JSUnusedGlobalSymbols
  return {
    kojiConfigFiles,
    refresh,
  };
})();
