import configObjectDev from "./development.js";
import configObjectProd from "./production.json";

const configObject = __DEV__ ? configObjectDev : configObjectProd;
/**
 * Gets entry from configuration
 * @param {string} path - path to configuration
 * @returns {any} entry from configuration
 */
const config = (path) => deepFind(configObject, path);

function deepFind(obj, path) {
  var paths = path.split("."),
    current = obj,
    i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] === undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}

export default config;
