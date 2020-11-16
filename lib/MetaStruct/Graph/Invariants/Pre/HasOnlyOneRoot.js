export class HasOnlyOneRoot {
  #findRoots (nodes, edges) {
    return nodes.filter(node => this.#findBounds(nodes, edges).indexOf(node) < 0)
  }

  #findBounds (nodes, edges) {
    return edges.map(edge => edge.rightNode)
  }
  
  validate (nodes, edges) {
    const rootNodes = this.#findRoots(nodes, edges)
    
    if (!rootNodes.length) {
      throw new Error ('Your graph has no root node.')
    }

    if (rootNodes.length > 1) {
      const errorMessage = 'Your graph has more than one root (you can have only one root in graph entity).'
      const errorData = `Root node UUIDs: ${rootNodes.map(node => node.uuid).join(', ')}.`

      throw new Error (errorMessage.concat(errorData))
    }
  }
}
