/**
 * @private
 *
 * @class Adjacency
 */
export default class Adjacency {
  /**
   * @hideconstructor
   *
   * @param {Object} leftNode - Parent Node instance
   * @param {Object} rightNode - Child Node instance
   * @param {Object} edge - Edge instance
   */
  constructor (leftPoint, rightPoint, edge) {
  /**
   * @property {Object} leftNode - Parent Node instance
   * @property {Object} rightNode - Child Node instance
   * @property {Object} edge - Edge instance
   */
    this.leftPoint = leftPoint
    this.rightPoint = rightPoint
    this.edge = edge
  }

  /**
   * @public
   *
   * @returns {Number}
   */
  get weight () {
    return this.edge.weight
  }
}
