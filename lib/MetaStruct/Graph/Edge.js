import * as Edge from './Edge/Factory'

/**
 * Edge creation class
 * @public
 * @class Edge
 *
 * @example
 *
 * const node_1 = Graph.Node.create('id_1', ['label_1']),
 * const node_2 = Graph.Node.create('id_2', ['label_2']),
 *
 * Graph.Edge.create(node_1, node_2, ['label']),
 */
export default class {
  /**
   * @public
   *
   * @param {Object} - Parent Node instance
   * @param {Object} - Child Node instance
   * @param {Array.<String>} - labels
   * @param {Object.<String|Any>} - properties
   * @param {Number} - weight
   *
   * @returns {Graph.Edge} - Edge instance
   */
  static create (
    leftNode = Edge.Factory.NO_LEFT_NODE,
    rightNode = Edge.Factory.NO_RIGHT_NODE,
    labels = Edge.Factory.NO_LABELS,
    properties = Edge.Factory.NO_PROPERTIES,
    weight = Edge.Factory.NO_WEIGHT
  ) {
    return new Edge.Factory().create(leftNode, rightNode, labels, properties, weight)
  }

  /**
   * @hideconstructor
   *
   * @param {Object} leftNode - Parent Node instance
   * @param {Object} rightNode - Child Node instance
   * @param {Array.<String>} labels - labels for edge
   * @param {Object.<String|Any>} properties - properties
   * @param {Number} weight - weight
   */
  constructor (leftNode, rightNode, labels, properties, weight) {
    /**
     * @property {Object} leftNode - Parent Node instance
     * @property {Object} rightNode - Child Node instance
     * @property {Array.<String>} labels - labels
     * @property {Object.<String|Any>} properties - properties
     * @property {Number} weight - weight
     */
    this.leftNode = leftNode
    this.rightNode = rightNode
    this.labels = labels
    this.properties = properties
    this.weight = weight
  }
}
