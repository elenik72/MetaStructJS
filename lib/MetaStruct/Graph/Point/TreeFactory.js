import Point from './Factory'
import Adjacency from './Adjacency'

/**
 * @private
 *
 * @class TreeFactory
 */
export default class TreeFactory {
  /**
   * Wraps a node with an abstraction
   * @private
   *
   * @param {Array.<Graph.Node>} nodes - Array of node instances
   * @returns {Array.<Graph.Point>}
   */
  _wrapToPoints (nodes) {
    return nodes.map(node => this._buildPoint(node))
  }

  /**
   * Wraps a node with an abstraction
   * @private
   *
   * @param {Graph.Node} node - Node instances
   * @returns {Graph.Point}
   */
  _buildPoint (node) {
    return Point.create(node)
  }

  /**
   * @private
   *
   * @param {Array.<Graph.Point>} points - Array of point instances
   * @param {Array.<Graph.Edge>} edges - Array of edge instances
   * @returns {Object}
   */
  _findRootPoint (points, edges) {
    return points.find(point => !(edges.map(edge => edge.rightNode).includes(point.node)))
  }

  /**
   * @private
   *
   * @param {Array.<Graph.Point>} points - Array of point instances
   * @param {Array.<Graph.Edges>} edges - Array of edge instances
   * @returns {void}
   */
  _buildAndAppendAdjacencies (points, edges) {
    points.forEach(point => {
      const pointEdges = edges.filter(edge => edge.leftNode === point.node)

      if (!pointEdges.length) return false

      const adjacencies = pointEdges.map(pointEdge => {
        const leftPoint = point
        const rightPoint = points.find(rPoint => rPoint.node === pointEdge.rightNode)

        return new Adjacency(leftPoint, rightPoint, pointEdge)
      })

      point._adjacencies = [...adjacencies]
    })
  }

  /**
   * @public
   *
   * @param {Array.<Graph.Node>} points - Array of point instances
   * @param {Array.<Graph.Edge>} edges - Array of edge instances
   * @returns {_findRootPoint~Object}
   */
  create (nodes, edges) {
    const points = this._wrapToPoints(nodes)
    this._buildAndAppendAdjacencies(points, edges)

    return this._findRootPoint(points, edges)
  }
}
