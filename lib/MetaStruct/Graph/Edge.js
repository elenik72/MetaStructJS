import * as Edge from './Edge/Factory'

export default class {
  static create (
    leftNode = Edge.Factory.NO_LEFT_NODE,
    rightNode = Edge.Factory.NO_RIGHT_NODE,
    labels = Edge.Factory.NO_LABELS,
    properties = Edge.Factory.NO_PROPERTIES,
    weight = Edge.Factory.NO_WEIGHT
  ) {
    return new Edge.Factory().create(leftNode, rightNode, labels, properties, weight)
  }

  constructor (leftNode, rightNode, labels, properties, weight) {
    this.leftNode = leftNode
    this.rightNode = rightNode
    this.labels = labels
    this.properties = properties
    this.weight = weight
  }
}
