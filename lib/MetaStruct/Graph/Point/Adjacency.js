export default class Adjacency {
  constructor (leftPoint, rightPoint, edge) {
    this.leftPoint = leftPoint
    this.rightPoint = rightPoint
    this.edge = edge
  }

  get weight () {
    return this.edge.weight
  }
}
