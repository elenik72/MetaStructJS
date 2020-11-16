export default class Point {
  constructor (node) {
    this.node = node
    this._adjacencies = []
  }

  get uuid () {
    return this.node.uuid
  }

  get adjacencies () {
    return this._adjacencies.sort((a, b) => a.weight - b.weight)
  }
}
