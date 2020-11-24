import Edge from '../Edge'
import Node from '../Node'

/**
 * @private
 *
 * @class Edge Factory
 */
export class Factory {
  /**
   * @static
   * @type {Number}
   */
  static NO_WEIGHT = 0

  /**
   * @static
   * @type {Array}
   */
  static NO_LABELS = Object.freeze([])

  /**
   * @static
   * @type {Object}
   */
  static NO_PROPERTIES = Object.freeze({})

  /**
   * @static
   * @type {?Number|?String}
   */
  static AUTO_GENERATED_UUID = null

  /**
   * @static
   * @type {?Object}
   */
  static NO_LEFT_NODE = null

  /**
   * @static
   * @type {?Object}
   */
  static NO_RIGHT_NODE = null

  /**
   * Converting to string
   * @private
   *
   * @param {String|Number} labels - label format string or number
   * @returns {String} label in string type
   */
  _prepareLabels (labels) {
    return labels.map(label => String(label))
  }

  /**
   * Edge validation
   * @private
   *
   * @param {Object} - Parent Node instance
   * @param {Object} - Child Node instance
   * @param {Array.<string>} - labels
   * @param {Object.<string|any>} - properties
   * @param {Number} - weight
   * @returns {Void}
   */
  _validateAttributes (leftNode, rightNode, labels, properties, weight) {
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

    if ((Array.isArray(properties) && typeof properties === 'object') || typeof properties !== 'object') {
      throw new Error('Node properties collection should be a type of Hash.')
    }

    if (!Number.isInteger(weight)) {
      throw new Error('Edge weight should be a type of integer.')
    }
  }

  /**
   * @private
   *
   * @param {Object} leftNode - Parent Node instance
   * @param {Object} rightNode - Child Node instance
   * @param {Array.<string>} labels - labels
   * @param {Object.<string|any>} properties - properties
   * @param {Number} weight - weight
   * @returns {createEdge~Edge}
   */
  create (
    leftNode = this.NO_LEFT_NODE,
    rightNode = this.NO_RIGHT_NODE,
    labels = this.NO_LABELS,
    properties = this.NO_PROPERTIES,
    weight = this.NO_WEIGHT
  ) {
    this._validateAttributes(leftNode, rightNode, labels, properties, weight)

    const pLabels = this._prepareLabels(labels)

    return this.createEdge(leftNode, rightNode, pLabels, properties, weight)
  }

  /**
   * @private
   *
   * @param {Object} leftNode - Parent Node instance
   * @param {Object} rightNode - Child Node instance
   * @param {Array.<String>} labels - labels
   * @param {Object.<string|any>} properties - properties
   * @param {Number} weight - weight
   * @returns {Object} - Edge instance
   */
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
