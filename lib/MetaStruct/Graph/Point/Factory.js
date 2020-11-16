import Point from '../Point'

export class Factory {
  create (node) {
    return new Point(node)
  }
}
