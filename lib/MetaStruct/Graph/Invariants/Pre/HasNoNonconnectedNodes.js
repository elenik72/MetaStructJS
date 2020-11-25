/**
 * @private
 *
 * @class Pre.Invariant.HasNoNonconnectedNodes
 */
export class HasNoNonconnectedNodes {
  /**
   * @private
   *
   * @param {Array.<Graph.Node>} nodes - Array of node instances
   * @param {Array.<Graph.Edge>} edges - Array of edge instances
   * @returns {Array.<Graph.Node>}
   */
  _findNonConnectedNodes (nodes, edges) {
    return nodes.filter(node => {
      const connectedNodesList = edges.filter(edge => edge.leftNode === node || edge.rightNode === node)

      if (!connectedNodesList.length) return node
    })
  }

  /**
   * @public
   *
   * @param {Array.<Graph.Node>} nodes - Array of node instances
   * @param {Array.<Graph.Edge>} edges - Array of edge instances
   * @returns {Void}
   */
  validate (nodes, edges) {
    const nonConnectedNodes = this._findNonConnectedNodes(nodes, edges)

    const errorMessage = 'Some nodes has no edges (all nodes should have edges).'
    const errorData = `Non-connected node UUIDs: ${nonConnectedNodes.map(node => node.uuid).join(', ')}.`

    /**
     * @throw Will throw if some nodes has no edges
     */
    if (nonConnectedNodes.length) {
      throw new Error(errorMessage.concat(errorData))
    }
  }
}
