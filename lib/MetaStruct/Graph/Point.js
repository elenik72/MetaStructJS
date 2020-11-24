/**
 * @private
 * @class Point
 */
export default class {
  /**
   * @hideconstructor
   *
   * @param {Graph.Node} root - Root node instance
   */
  constructor (node) {
    /**
     * @property {Object} node - Node instance
     * @property {Array} _adjacencies - Array of edge instances
     */
    this.node = node
    this._adjacencies = []
  }

  /**
   * @public
   *
   * @returns {String} - Unique node identifier
   */
  get uuid () {
    return this.node.uuid
  }

  /**
   * @public
   *
   * @returns {Array} - Array of edges sorted by weight
   */
  get adjacencies () {
    return this._adjacencies.sort((a, b) => a.weight - b.weight)
  }
}
