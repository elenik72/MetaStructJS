/**
 * @private
 *
 * @class Post.Invariant.HasNoCycles
 */
export class HasNoCycles {
  /**
   * @private
   *
   * @param {Graph} graph - Graph instance
   * @returns {_searchCyclesNode~Array.<Graph.Node>}
   */
  _findCyclesNodes (graph) {
    const currentPoint = graph.root
    const listCyclesNode = []
    const listPathNodes = [currentPoint.node]

    return this._searchCyclesNode(currentPoint, listCyclesNode, listPathNodes)
  }

  /**
   * @private
   *
   * @param {Graph.Node} currentPoint - A root node of the graph
   * @param {Array.<Graph.Node>} listCyclesNode - Array for add cycle nodes
   * @param {Array.<Graph.Node>} listPathNodes - Array for add graph traversal path
   * @returns {Array.<Graph.Node>}
   */
  _searchCyclesNode (currentPoint, listCyclesNode, listPathNodes) {
    const adjacencies = currentPoint._adjacencies

    adjacencies.forEach(adjacency => {
      const rightPoint = adjacency.rightPoint

      if (listPathNodes.includes(rightPoint.node)) {
        listCyclesNode.push(adjacency.leftPoint.node)
        return false
      }

      listPathNodes.push(rightPoint.node)

      if ((rightPoint._adjacencies).length) {
        this._searchCyclesNode(rightPoint, listCyclesNode, listPathNodes)
      } else {
        const fromIndex = listPathNodes.indexOf(adjacency.leftPoint.node)
        const toIndex = listPathNodes.indexOf(rightPoint.node)

        listPathNodes.splice(fromIndex, toIndex)
      }
    })
    return listCyclesNode
  }

  /**
   * @public
   *
   * @param {Graph.Node} graph - A root node of the graph
   * @returns {Void}
   */
  validate (graph) {
    const cyclesNode = this._findCyclesNodes(graph)
    /**
     * @throw Will throw if the graph nodes is cycled
     */
    if (Object.values(cyclesNode).length) {
      throw new Error(`You have the following cycled nodes: ${cyclesNode.map(node => node.uuid).join(', ')}.`)
    }
  }
}
