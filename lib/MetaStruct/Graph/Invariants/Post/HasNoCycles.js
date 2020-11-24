export class HasNoCycles {
  _findCyclesNodes (graph) {
    const currentPoint = graph.root
    const listCyclesNode = []
    const listPathNodes = [currentPoint.node]

    return this._searchCyclesNode(currentPoint, listCyclesNode, listPathNodes)
  }

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

  validate (graph) {
    const cyclesNode = this._findCyclesNodes(graph)

    if (Object.values(cyclesNode).length) {
      throw new Error(`You have the following cycled nodes: ${cyclesNode.map(node => node.uuid).join(', ')}.`)
    }
  }
}
