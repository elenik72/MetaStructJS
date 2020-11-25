import Graph from '../Graph'
import Edge from './Edge'
import Node from './Node'
import TreeFactory from './Point/TreeFactory'
import * as Invariants from './Invariants'

/**
 * @private
 *
 * @class Graph Factory
 */
export class Factory {
  /**
   * @constant
   * @type {Array}
   */
  _NO_NODES = Object.freeze([])

  /**
   * @constant
   * @type {Array}
   */
  _NO_EDGES = Object.freeze([])

  /**
   * @private
   *
   * @param {Array.<Graph.Node>} - Array of node instances
   * @param {Array.<Graph.Edge>} - Array of edge instances
   *
   * @returns {void}
   */
  _validateGraphPreInvariants (nodes, edges) {
    return new Invariants.Pre.All().validate(nodes, edges)
  }

  /**
   * @private
   *
   * @param {Graph} - Graph instance
   *
   * @returns {void}
   */
  _validateGraphPostInvariants (graph) {
    return new Invariants.Post.All().validate(graph)
  }

  /**
   * @private
   *
   * @param {Array.<Graph.Node>} - Array of node instances
   * @param {Array.<Graph.Edge>} - Array of edge instances
   *
   * @returns {void}
   */
  _validateAttributes (nodes, edges) {
    if (!Array.isArray(nodes) || !(nodes.every(node => node instanceof Node))) {
      throw new Error('Node list should be an array of Graph.Node entities.')
    }

    if (!Array.isArray(edges) || !(edges.every(edge => edge instanceof Edge))) {
      throw new Error('Edge list should be an array of Graph.Edge entities.')
    }

    if (!nodes.length || !edges.length) {
      throw new Error('You should provide edges or nodes for correct graph entity.')
    }

    if ([...nodes.reduce((nodes, node) => nodes.add(node.uuid), new Set())].length < nodes.length) {
      throw new Error('You have nodes with duplicated uuids. You should provide nodes without duplicates.')
    }

    if ([...edges.reduce((edges, edge) => edges.add(JSON.stringify(edge)), new Set())].length < edges.length) {
      throw new Error('You have duplicated edges (by identical nodes in left and right sides). You should provide edges without duplicates.')
    }
  }

  /**
   * @public
   *
   * @param {Array.<Graph.Node>} - Array of node instances
   * @param {Array.<Graph.Edge>} - Array of edge instances
   *
   * @returns {Graph}
   */
  create (nodes = this._NO_NODES, edges = this._NO_EDGES) {
    this._validateAttributes(nodes, edges)
    this._validateGraphPreInvariants(nodes, edges)

    const pointTree = this.buildPointTree(nodes, edges)
    const graph = this.createGraph(pointTree, nodes, edges)

    this._validateGraphPostInvariants(graph)

    return graph
  }

  /**
   * @public
   *
   * @param {Array.<Graph.Node>} - Array of node instances
   * @param {Array.<Graph.Edge>} - Array of edge instances
   *
   * @returns {Graph.Point}
   */
  buildPointTree (nodes, edges) {
    return new TreeFactory().create(nodes, edges)
  }

  /**
   * @public
   *
   * @param {Graph.Node} - Root node instance
   * @param {Array.<Graph.Node>} - Array of node instances
   * @param {Array.<Graph.Edge>} - Array of edge instances
   *
   * @returns {Graph.Point}
   */
  createGraph (rootPoint, nodes, edges) {
    return new Graph(rootPoint, nodes, edges)
  }
}
