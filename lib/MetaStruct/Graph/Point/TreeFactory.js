import Point from './Factory'
import Adjacency from './Adjacency'

export default class TreeFactory {
  _wrapToPoints (nodes) {
    return nodes.map(node => this._buildPoint(node))
  }

  _buildPoint (node) {
    return Point.create(node)
  }

  _findRootPoint (points, edges) {
    return points.find(point => !(edges.map(edge => edge.rightNode).includes(point.node)))
  }

  _buildAndAppendAdjacencies (points, edges) {
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
    const points = this._wrapToPoints(nodes)
    this._buildAndAppendAdjacencies(points, edges)

    return this._findRootPoint(points, edges)
  }
}
