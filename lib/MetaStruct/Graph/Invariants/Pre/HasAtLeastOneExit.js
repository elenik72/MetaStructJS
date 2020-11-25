/**
 * @private
 *
 * @class Pre.Invariant.HasAtLeastOneExit
 */
export class HasAtLeastOneExit {
  /**
   * @private
   *
   * @param {Array.<Graph.Node>} nodes - Array of node instances
   * @param {Array.<Graph.Edge>} edges - Array of edge instances
   * @returns {Array.<Graph.Node>}
   */
  _findBounds (nodes, edges) {
    const rightNodes = edges.map(edge => edge.rightNode)
    const leftNodes = edges.map(edge => edge.leftNode)

    return rightNodes.filter(node => leftNodes.indexOf(node) < 0)
  }

  /**
   * @public
   *
   * @param {Array.<Graph.Node>} nodes - Array of node instances
   * @param {Array.<Graph.Edge>} edges - Array of edge instances
   * @returns {Void}
   */
  validate (nodes, edges) {
    const boundNodes = this._findBounds(nodes, edges)
    /**
     * @throw Will throw if the graph has no exit nodes
     */
    if (!Object.values(boundNodes).length) {
      throw new Error('Your graph has no exit nodes (you should provide at least one exit node).')
    }
  }
}
