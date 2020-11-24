import Point from '../Point'

export default class Factory {
  static create (node) {
    return new Point(node)
  }
}
