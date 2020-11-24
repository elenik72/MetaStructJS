import * as Graph from './Graph/Factory'
import * as Algorithms from './Graph/Algorithms'

/**
 * Node instance
 * @typedef {Object} Graph.Node
 * @property {String} uuid - Unique identificator
 * @property {Object} properties - Properties of node
 * @property {Array.<String>} labels - Labels of node
 */

/**
 * Edge instance
 * @typedef {Object} Graph.Edge
 * @property {Object.<Graph.Node>} Graph.Node - Parent Node instance
 * @property {Object.<Graph.Node>} Graph.Node - Child Node instance
 * @property {Object} properties - Properties of node
 * @property {Array.<String>} labels - Labels of edge
 * @property {Number} weight - Unique identificator
 */

/**
 * Graph instance
 * @typedef {Object} Graph
 * @property {Array.<Graph.Node>} nodes - Array of node instances
 * @property {Array.<Graph.Edge>} edges - Array of edge instances
 * @property {Object} root - Root node instance
 */

/**
 * Graph creation class
 * @public
 * @class Graph
 *
 * @example
 * const nodes = [
 *   Graph.Node.create('id_1', ['label_1']),
 *   Graph.Node.create('id_2', ['label_2']),
 *   Graph.Node.create('id_3', ['label_3'])
 * ]
 *
 * const edges = [
 *   Graph.Edge.create(nodes[0], nodes[1], ['label_1']),
 *   Graph.Edge.create(nodes[1], nodes[2], ['label_2'])
 * ]
 *
 * const graph = new Graph(nodes, edges)
 */
export default class {
  /**
   * @public
   *
   * @param {Array.<Graph.Node>} nodes - Array of node instances
   * @param {Array.<Graph.Edge>} edges - Array of edge instances
   *
   * @returns {Graph} - Graph instance
   */
  static create (nodes, edges) {
    return new Graph.Factory().create(nodes, edges)
  }

  constructor (root, nodes, edges) {
  /**
   * @property {Graph.Node} root - Root node instance
   * @property {Array.<Graph.Node>} nodes - Array of node instances
   * @property {Array.<Graph.Edge>} edges - Array of edge instances
   */
    this.root = root
    this.nodes = nodes
    this.edges = edges
  }

  /**
   * @param {String} nodeUuid - uuid of the node
   *
   * @returns {Graph.Node} - Node instance
   */
  find (nodeUuid) {
    return new Algorithms.FindPoint().call(this, nodeUuid)
  }

  /**
   * @returns {Object}
   */
  get toJson () {
    return JSON.stringify({ nodes: this.nodes, edges: this.edges })
  }
}
