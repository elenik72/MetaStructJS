import * as Point from './Factory'
import Adjacency from './Adjacency'

export default class TreeFactory {
  #wrapToPoints (nodes) {
    return nodes.map(node => this.#buildPoint(node))
  }

  #buildPoint (node) {
    return new Point.Factory().create(node)
  }

  #findRootPoint (points, edges) {
    return points.find(point => !(edges.map(edge => edge.rightNode).includes(point.node)))
  }

  #buildAndAppendAdjacencies (points, edges) {
    points.forEach(point => {
      const pointEdges = edges.filter(edge => edge.leftNode === point.node)

      if (!pointEdges.length) return false

      const adjacencies = pointEdges.map(pointEdge => {
        const leftPoint = point
        const rightPoint = points.find(rPoint => rPoint.node === pointEdge.rightNode)

        return new Adjacency(leftPoint, rightPoint, pointEdge)
      })

      point._adjacencies = [...adjacencies]
    })
  }

  create (nodes, edges) {
    const points = this.#wrapToPoints(nodes)
    this.#buildAndAppendAdjacencies(points, edges)

    return this.#findRootPoint(points, edges)
  }
}
