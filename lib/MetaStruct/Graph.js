import * as Graph from './Graph/Factory'
import * as Algorithms from './Graph/Algorithms'

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

  /**
   * @hideconstructor
   *
   * @param {Graph.Node} root - Root node instance
   * @param {Array.<Graph.Node>} nodes - Array of node instances
   * @param {Array.<Graph.Edge>} edges - Array of edge instances
   */
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
