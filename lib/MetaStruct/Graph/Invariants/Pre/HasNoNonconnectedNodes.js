export class HasNoNonconnectedNodes {
  _findNonConnectedNodes (nodes, edges) {
    return nodes.filter(node => {
      const connectedNodesList = edges.filter(edge => edge.leftNode === node || edge.rightNode === node)

      if (!connectedNodesList.length) return node
    })
  }

  validate (nodes, edges) {
    const nonConnectedNodes = this._findNonConnectedNodes(nodes, edges)

    const errorMessage = 'Some nodes has no edges (all nodes should have edges).'
    const errorData = `Non-connected node UUIDs: ${nonConnectedNodes.map(node => node.uuid).join(', ')}.`

    if (nonConnectedNodes.length) {
      throw new Error(errorMessage.concat(errorData))
    }
  }
}
