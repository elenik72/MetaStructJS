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
   * Converting label to string
   * @private
   *
   * @param {String} labels - label format string or number
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
   * @param {Array.<String>} - labels
   * @param {Object.<String|Any>} - properties
   * @param {Number} - weight
   * @returns {Void}
   */
  _validateAttributes (leftNode, rightNode, labels, properties, weight) {
    /**
     * @throws Will throws if left edge node is missing
     */
    if (leftNode === null) {
      throw new Error('Left edge node is missing: you should provide both left and right nodes.')
    }

    /**
     * @throws Will throws if right edge node is missing
     */
    if (rightNode === null) {
      throw new Error('Right edge node is missing: you should provide both left and right nodes.')
    }

    /**
     * @throws Will throws if left edge Node is not a instance of Graph.Node
     */
    if (!(leftNode instanceof Node)) {
      throw new Error('Left edge Node should be a type of Graph.Node.')
    }

    /**
     * @throws Will throws if right edge Node is not a instance of Graph.Node
     */
    if (!(rightNode instanceof Node)) {
      throw new Error('Right edge Node should be a type of Graph.Node.')
    }

    /**
     * @throws Will throws if edge labels collection is not a type of array of string
     */
    if (!Array.isArray(labels)) {
      throw new Error('Edge labels collection should be a type of Array of strings.')
    }

    /**
     * @throws Will throws if nodes label is not a type string
     */
    if (labels.every(label => typeof label !== 'string')) {
      throw new Error('Each nodes label should be a type of string.')
    }

    /**
     * @throws Will throws if node properties collection is not a type of Hash
     */
    if ((Array.isArray(properties) && typeof properties === 'object') || typeof properties !== 'object') {
      throw new Error('Node properties collection should be a type of Hash.')
    }

    /**
     * @throws Will throws if edge weight is not a type of integer
     */
    if (!Number.isInteger(weight)) {
      throw new Error('Edge weight should be a type of integer.')
    }
  }

  /**
   * @public
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
   * @public
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
