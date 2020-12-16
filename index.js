
/** @type {Record<string, Function>} */
const _resolvers = {};
/** @type {Record<string, Promise<any>>} */
const _providers = {};
/** @type {Record<string, any>} */
const _properties = {};

/**
 * @param {string} name 
 * @returns {Promise<any>}
 */
function _getOrCreateResolution(name) {
  if (!_providers[name]) {
    _providers[name] = new Promise(resolve => _resolvers[name] = resolve);
  }
  return _providers[name];
}

export const AppContext = {
  /**
   * @template T
   * @param {string} name 
   * @returns {Promise<T>}
   */
  require(name) {
    return _getOrCreateResolution(name);
  },

  /**
   * @param {string} name 
   * @param {value} any
   */
  provide(name, value) {
    void _getOrCreateResolution(name);
    _resolvers[name](value);
  },

  /**
   * @template T
   * @param {string} name 
   * @returns {T}
   */
  get(name) {
    return _properties[name];
  },

  /**
   * @param {string} name 
   * @param {any} value 
   */
  set(name, value) {
    _properties[name] = value;
  }
};
