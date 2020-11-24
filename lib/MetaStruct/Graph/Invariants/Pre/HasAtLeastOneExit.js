export class HasAtLeastOneExit {
  _findBounds (nodes, edges) {
    const rightNodes = edges.map(edge => edge.rightNode)
    const leftNodes = edges.map(edge => edge.leftNode)

    return rightNodes.filter(node => leftNodes.indexOf(node) < 0)
  }

  validate (nodes, edges) {
    const boundNodes = this._findBounds(nodes, edges)

    if (!Object.values(boundNodes).length) {
      throw new Error('Your graph has no exit nodes (you should provide at least one exit node).')
    }
  }
}
