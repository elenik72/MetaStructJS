export default class FindRootNodes {
  call (graph, nodeUuid = null) {
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
