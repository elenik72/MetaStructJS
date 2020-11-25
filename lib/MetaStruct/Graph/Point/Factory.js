import Point from '../Point'

/**
 * @private
 *
 * @class Factory
 */
export default class Factory {
  /**
   * @public
   *
   * @param {Object} node - Node instance
   * @returns {Object} - Point instance
   */
  static create (node) {
    return new Point(node)
  }
}
