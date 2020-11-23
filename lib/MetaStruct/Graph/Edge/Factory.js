import Edge from '../Edge'
import Node from '../Node'

export class Factory {
  static NO_WEIGHT = 0
  static NO_LABELS = Object.freeze([])
  static NO_PROPERTIES = Object.freeze({})
  static AUTO_GENERATED_UUID = null
  static NO_LEFT_NODE = null
  static NO_RIGHT_NODE = null

  #prepareLabels(labels) {
    return labels.map(label => String(label))
  }

  #validateAttributes(leftNode, rightNode, labels, properties, weight) {
    if (leftNode === null) {
      throw new Error('Left edge node is missing: you should provide both left and right nodes.')
    }

    if (rightNode === null) {
      throw new Error('Right edge node is missing: you should provide both left and right nodes.')
    }

    if (!(leftNode instanceof Node)) {
      throw new Error('Left edge Node should be a type of Graph.Node.')
    }

    if (!(rightNode instanceof Node)) {
      throw new Error('Right edge Node should be a type of Graph.Node.')
    }

    if (!Array.isArray(labels)) {
      throw new Error('Edge labels collection should be a type of Array of strings.')
    }

    if (labels.every(label => typeof label !== 'string')) {
      throw new Error('Each nodes label should be a type of string.')
    }

    if (Array.isArray(properties) && typeof properties === 'object' || typeof properties !== 'object') {
      throw new Error('Node properties collection should be a type of Hash.')
    }

    if (!Number.isInteger(weight)) {
      throw new Error('Edge weight should be a type of integer.')
    }
  }

  create (
    leftNode = this.NO_LEFT_NODE,
    rightNode = this.NO_RIGHT_NODE,
    labels = this.NO_LABELS,
    properties = this.NO_PROPERTIES,
    weight = this.NO_WEIGHT
  ) {
    this.#validateAttributes(leftNode, rightNode, labels, properties, weight)

    const pLabels = this.#prepareLabels(labels)

    return this.createEdge(leftNode, rightNode, pLabels, properties, weight)
  }

  createEdge (leftNode, rightNode, labels, properties, weight) {
    return new Edge(
      leftNode,
      rightNode,
      labels,
      properties,
      weight
    )
  }
}
