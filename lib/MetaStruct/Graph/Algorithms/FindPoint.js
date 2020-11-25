/**
 * Find a node by uuid
 * @private
 * @class FindRootNodes
 *
 * @example
 *
 * const edges = [edge1, edge2, edge3]
 * const nodes = [node1, node2, node3, node4]
 *
 * const graph = Graph.create(nodes, edges)
 *
 * graph.find(1)
 */
export default class FindRootNodes {
  /**
   * @public
   *
   * @param {Object} Graph - Graph instance
   * @param {String|Number} nodeUuid - Unique identificator
   *
   * @returns {Graph.Node} - Node instance
   */
  static call (graph, nodeUuid = null) {
    let point = null
    const root = graph.root
    let stack = [root]

    if (!nodeUuid) return false
    const uuid = String(nodeUuid)

    if (root.uuid === uuid) return root

    while (stack.length) {
      const current = stack.pop()

      current.adjacencies.forEach((adjacency) => {
        const rightPoint = adjacency.rightPoint

        if (rightPoint.uuid === uuid) {
          point = rightPoint
          stack = []
        } else {
          stack.push(rightPoint)
        }
      })
    }

    return point
  }
}
