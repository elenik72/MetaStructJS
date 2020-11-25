/**
 * @private
 *
 * @class Pre.Invariant.HasOnlyOneRoot
 */
export class HasOnlyOneRoot {
  /**
   * @private
   *
   * @param {Array.<Graph.Node>} nodes - Array of node instances
   * @param {Array.<Graph.Edge>} edges - Array of edge instances
   * @returns {Array.<Graph.Node>}
   */
  _findRoots (nodes, edges) {
    return nodes.filter(node => this._findBounds(nodes, edges).indexOf(node) < 0)
  }

  /**
   * @private
   *
   * @param {Array.<Graph.Node>} nodes - Array of node instances
   * @param {Array.<Graph.Edge>} edges - Array of edge instances
   * @returns {Array.<Graph.Edge>}
   */
  _findBounds (nodes, edges) {
    return edges.map(edge => edge.rightNode)
  }

  /**
   * @public
   *
   * @param {Array.<Graph.Node>} nodes - Array of node instances
   * @param {Array.<Graph.Edge>} edges - Array of edge instances
   * @returns {Void}
   */
  validate (nodes, edges) {
    const rootNodes = this._findRoots(nodes, edges)

    /**
     * @throw Will throw if graph has no root
     */
    if (!rootNodes.length) {
      throw new Error('Your graph has no root node.')
    }

    /**
     * @throw Will throw if graph has more than one root
     */
    if (rootNodes.length > 1) {
      const errorMessage = 'Your graph has more than one root (you can have only one root in graph entity).'
      const errorData = `Root node UUIDs: ${rootNodes.map(node => node.uuid).join(', ')}.`

      throw new Error(errorMessage.concat(errorData))
    }
  }
}
